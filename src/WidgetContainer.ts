import * as $ from "jquery"
import * as _ from "underscore"
import { WidgetsFactory } from "./WidgetsFactory"
import { WidgetRuntime } from "./WidgetRuntime";
import { WidgetContainerConfig } from "./WidgetConfig";
import { WidgetInstance, WidgetDefinition } from "./WidgetInstance";
import { LayoutMode, isGrid } from "./LayoutMode";
import { WidgetRuntimeEvents } from "./WidgetRuntimeEvents"

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
export class WidgetContainer extends WidgetRuntime {
    private static defaultCols: number = 24
    private flowThreshold: MediaQueryList;
    private rows: number
    private widgets: WidgetInstance[] = [];
    private displayMode: LayoutMode;
    private widgetsFactory: WidgetsFactory;

    constructor(
        private widgetContainerId: string,
        widgetDefinitions: WidgetDefinition[],
        context: { [indexer: string]: any }
    ) {
        super(context)
        this.widgetsFactory = new WidgetsFactory(widgetDefinitions);
        this.flowThreshold = window.matchMedia($(this.widgetContainerId).data("flow-threshold"));
        $(this.widgetContainerId).addClass("widget-container")
        // this.initTooltip();
    }

    /**
     * 初始化
     * @param widgets 小组件
     */
    public init(widgetConfig: WidgetContainerConfig) {
        this.rows = widgetConfig.rows;
        //TODO: 根据权限过滤
        this.widgets = _.map(widgetConfig.widgets, (wcfg) => this.widgetsFactory.create(wcfg, this));
        this.render();

        $(window).on("resize", () => {
            this.refreshView(true);
        })
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

    private renderWidgets(widgets:WidgetInstance[]) {
        _.each(widgets, (widget) => {
            let $widgetContainer = $(`#${widget.getId()}`);
            let $widget = $($widgetContainer.find(".widget").get(0));
            widget.render(<HTMLDivElement>$widget.get(0)).then(() => {
                $widget.removeClass("widget-loading")
                this.trigger(WidgetRuntimeEvents.runtime.widgetRenderComplete, widget)
            })
        });
    }

    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    private appendWidgetNodes(widgets: WidgetInstance[]) {
        _.each(widgets, (widget) => {
            let $widgetContainer = $(`<div id="${widget.getId()}" class="widget-wrapper"><div class="widget widget-catalog-${widget.getCatalog()} widget-${widget.getType()} widget-loading"></div></div>`);
            let $widget = $($widgetContainer.find(".widget").get(0));

            if (widget.getTypeText()) {
                $widgetContainer.prepend(`<div class="widget-head">${widget.getTypeText()}</div>`).addClass("widget-title-padding");
            }
            $(this.widgetContainerId).append($widgetContainer);
        });
    }

    /**
     * 获取网格单位宽高
     */
    private getUnitSize(): UnitSize {
        let totalWidth = $(this.widgetContainerId).width();
        let cols = $(this.widgetContainerId).data("cols") - 0 || WidgetContainer.defaultCols;

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
            $(this.widgetContainerId)
                .css("position", "relative")
                .css("height", containerHeight).removeClass("widget-container-flow").addClass("widget-container-grid")
            $(this.widgetContainerId).find(">div").css("position", "absolute");

            return LayoutMode.grid
        }
        else {
            $(this.widgetContainerId).removeAttr("style").addClass("widget-container-flow").removeClass("widget-container-grid")
            $(this.widgetContainerId).find(">div").removeAttr("style");
            return LayoutMode.flow
        }
    }
    /**
     * 更新小组件样式
     */
    private updateWidgetStyle(widget: WidgetInstance, unitSize: UnitSize) {
        if (isGrid(this.displayMode)) {
            $("#" + widget.getId()).css("top", widget.getDisplay().row * unitSize.height + "px")
                .css("left", widget.getDisplay().col * unitSize.width + "px")
                .css("width", widget.getDisplay().colspan * unitSize.width + "px")
                .css("height", widget.getDisplay().rowspan * unitSize.height + "px");
        }
    }
    /**
     * 更新小组件样式
     */
    private updateWidgetStyles(gridUnitSize: UnitSize): void {
        _.each(this.widgets, (widget) => {
            this.updateWidgetStyle(widget, gridUnitSize)
        });
    }

    /**
     * 刷新视图
     */
    private refreshView(notifyChange:boolean): void {
        let gridUnitSize = this.getUnitSize();
        this.displayMode = this.updateDisplayMode(gridUnitSize);
        this.updateWidgetStyles(gridUnitSize);
        if (notifyChange) {
            this.notifyWidgetsSizeChange(this.displayMode);
        }
    }

    // private initTooltip() {
    //     $(this.widgetContainerId).tooltip();
    // }
}