import $ from "jquery"
import { WidgetsFactory } from "./WidgetsFactory"
import { WidgetContainerConfig, WidgetConfig } from "./WidgetConfig";
import { WidgetInstance, WidgetDefinition } from "./WidgetInstance";
import { LayoutMode, isGrid } from "./LayoutMode";
import { WidgetRuntimeEvents } from "./WidgetRuntimeEvents"
import { SimpleEventEmitter } from "se-emitter";

/**
 * 单位尺寸
 */
interface UnitSize {
    height: number
    width: number
}

/**
 * 小组件容器
 */
export class WidgetContainer extends SimpleEventEmitter {
    private cols: number = 24;
    private flowThreshold: MediaQueryList;
    private rows: number = 0
    private widgets: WidgetInstance[] = [];
    private widgetNodes: HTMLDivElement[] = [];
    private widgetConfigs: WidgetConfig[] = [];
    private displayMode: LayoutMode = LayoutMode.grid;
    private widgetsFactory: WidgetsFactory;
    private $widgetContailer: JQuery

    constructor(
        private widgetContainer: string | HTMLDivElement,
        widgetDefinitions: WidgetDefinition[]
    ) {
        super()
        this.widgetsFactory = new WidgetsFactory(widgetDefinitions);
        this.$widgetContailer = $(<any>this.widgetContainer)
        this.$widgetContailer.addClass("widget-container")
        this.flowThreshold = window.matchMedia(this.$widgetContailer.data("flow-threshold"));
    }

    /**
     * 初始化
     * @param widgets 小组件
     */
    public init(containerConfig: WidgetContainerConfig) {
        this.rows = containerConfig.rows;
        this.cols = containerConfig.cols
        this.widgetConfigs = containerConfig.widgets;

        this.destroy()

        if (containerConfig.maxWidth) {
            this.$widgetContailer.css("maxWidth", containerConfig.maxWidth)
        } else {
            this.$widgetContailer.css("maxWidth", "")
        }
        if (containerConfig.minWidth) {
            this.$widgetContailer.css("minWidth", containerConfig.minWidth)
        } else {
            this.$widgetContailer.css("minWidth", "")
        }

        this.widgets = containerConfig.widgets.map((wcfg) => this.widgetsFactory.create(wcfg/*, this*/));

        this.widgetNodes = [];
        this.render();

        $(window).on("resize", () => {
            this.refreshView(true);
        })
    }

    /**
     * 销毁小组件
     */
    public destroy() {
        this.widgets.forEach((w, idx) => {
            let ev = { element: this.widgetNodes[idx] }
            w.onDestroy(ev)
        })
        this.$widgetContailer.empty()
    }

    /**
     * 渲染小组件
     * @param widgets
     */
    private render() {
        this.appendWidgetNodes(this.widgets);
        this.refreshView(false);
        this.renderWidgets(this.widgets)
    }

    private renderWidgets(widgets: WidgetInstance[]) {
        widgets.forEach((widget, idx) => {
            let $widgetWrapper = $(this.widgetNodes[idx]);
            let widgetConfig = this.widgetConfigs[idx]
            let $widget = $widgetWrapper.find(".widget");
            let renderOptions = {
                config: widgetConfig,
                layoutMode: this.displayMode,
                wrapper: <HTMLDivElement>$widgetWrapper.get(0),
                element: <HTMLDivElement>$widget.get(0)
            }
            widget.init(renderOptions.element, renderOptions)
        });
    }

    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    private appendWidgetNodes(widgets: WidgetInstance[]) {
        widgets.forEach((widget) => {
            let $widgetWrapper = $(`<div class="widget-wrapper widget-wrapper-${widget.type}"><div class="widget widget-${widget.type}"></div></div>`);
            let $widget = $($widgetWrapper.find(".widget").get(0));

            let header = widget.header
            if (header) {
                $widgetWrapper.prepend(`<div class="widget-head"><span class="widget-head-text">${header}</span></div>`).addClass("widget-title-padding");
            }
            this.$widgetContailer.append($widgetWrapper);
            this.widgetNodes.push($widgetWrapper[0] as HTMLDivElement)
        });
    }

    /**
     * 获取网格单位宽高
     */
    private getUnitSize(): UnitSize {
        let totalWidth = <number>this.$widgetContailer.width();
        let cols = this.cols
        let unitSize: UnitSize = {
            height: totalWidth / cols,
            width: totalWidth / cols
        }
        return unitSize;
    }
    /**
     * 更新显示模式
     */
    private updateDisplayMode(gridUnitSize: UnitSize): LayoutMode {
        if (!this.flowThreshold.matches) {
            let containerHeight = this.rows * gridUnitSize.height + "px";
            this.$widgetContailer
                .css("position", "relative")
                .css("height", containerHeight).removeClass("widget-container-flow").addClass("widget-container-grid")
            this.$widgetContailer.find(">div").css("position", "absolute");

            return LayoutMode.grid
        }
        else {
            this.$widgetContailer.removeAttr("style").addClass("widget-container-flow").removeClass("widget-container-grid")
            this.$widgetContailer.find(">div").removeAttr("style");

            return LayoutMode.flow
        }
    }
    /**
     * 更新小组件样式
     */
    private updateWidgetStyle(widget: WidgetInstance, widgetIndex: number, unitSize: UnitSize) {
        if (isGrid(this.displayMode)) {
            let widgetConfig = this.widgetConfigs[widgetIndex]
            $(this.widgetNodes[widgetIndex]).css("top", widgetConfig.position.row * unitSize.height + "px")
                .css("left", widgetConfig.position.col * unitSize.width + "px")
                .css("width", widgetConfig.position.colspan * unitSize.width + "px")
                .css("height", widgetConfig.position.rowspan * unitSize.height + "px");
        }
    }
    /**
     * 更新小组件样式
     */
    private updateWidgetStyles(gridUnitSize: UnitSize): void {
        this.widgets.forEach((widget, idx) => {
            this.updateWidgetStyle(widget, idx, gridUnitSize)
        });
    }

    /**
     * 刷新视图
     */
    private refreshView(notifyChange: boolean): void {
        let gridUnitSize = this.getUnitSize();
        this.displayMode = this.updateDisplayMode(gridUnitSize);
        this.updateWidgetStyles(gridUnitSize);
        if (notifyChange) {
            this.notifyWidgetsSizeChange(this.displayMode);
        }
    }

    private notifyWidgetsSizeChange(layoutMode: LayoutMode): void {
        this.widgets.forEach((w, idx) => {
            let wrapper = this.widgetNodes[idx]
            w.onSizeChange({
                layoutMode: layoutMode,
                wrapper: wrapper,
                element: <HTMLDivElement>$(wrapper).find(".widget").get(0)
            })
        });
    }
}