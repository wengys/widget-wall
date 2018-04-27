import * as $ from "jquery";
import { WidgetsFactory } from "./WidgetsFactory";
import { LayoutMode, isGrid } from "./LayoutMode";
import { SimpleEventEmitter } from "se-emitter";
/**
 * 小组件容器
 */
export class WidgetContainer extends SimpleEventEmitter {
    constructor(widgetContainer, widgetDefinitions) {
        super();
        this.widgetContainer = widgetContainer;
        this.cols = 24;
        this.rows = 0;
        this.widgets = [];
        this.widgetNodes = [];
        this.widgetConfigs = [];
        this.displayMode = LayoutMode.grid;
        this.widgetsFactory = new WidgetsFactory(widgetDefinitions);
        this.flowThreshold = window.matchMedia($(this.widgetContainer).data("flow-threshold"));
        $(this.widgetContainer).addClass("widget-container");
    }
    /**
     * 初始化
     * @param widgets 小组件
     */
    init(containerConfig) {
        this.rows = containerConfig.rows;
        this.cols = containerConfig.cols;
        this.widgetConfigs = containerConfig.widgets;
        this.destroy();
        if (containerConfig.maxWidth) {
            $(this.widgetContainer).css("maxWidth", containerConfig.maxWidth);
        }
        else {
            $(this.widgetContainer).css("maxWidth", "");
        }
        if (containerConfig.minWidth) {
            $(this.widgetContainer).css("minWidth", containerConfig.minWidth);
        }
        else {
            $(this.widgetContainer).css("minWidth", "");
        }
        this.widgets = containerConfig.widgets.map((wcfg) => this.widgetsFactory.create(wcfg /*, this*/));
        this.widgetNodes = [];
        this.render();
        $(window).on("resize", () => {
            this.refreshView(true);
        });
    }
    /**
     * 销毁小组件
     */
    destroy() {
        this.widgets.forEach((w, idx) => {
            let ev = { element: this.widgetNodes[idx] };
            w.onDestroy(ev);
        });
        $(this.widgetContainer).empty();
    }
    /**
     * 渲染小组件
     * @param widgets
     */
    render() {
        this.appendWidgetNodes(this.widgets);
        this.refreshView(false);
        this.renderWidgets(this.widgets);
    }
    renderWidgets(widgets) {
        widgets.forEach((widget, idx) => {
            let $widgetWrapper = $(this.widgetNodes[idx]);
            let widgetConfig = this.widgetConfigs[idx];
            let $widget = $widgetWrapper.find(".widget");
            let renderOptions = {
                config: widgetConfig,
                layoutMode: this.displayMode,
                wrapper: $widgetWrapper.get(0),
                element: $widget.get(0)
            };
            widget.init(renderOptions.element, renderOptions);
        });
    }
    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    appendWidgetNodes(widgets) {
        widgets.forEach((widget) => {
            let $widgetWrapper = $(`<div class="widget-wrapper"><div class="widget widget-${widget.type}"></div></div>`);
            let $widget = $($widgetWrapper.find(".widget").get(0));
            let header = widget.header;
            if (header) {
                $widgetWrapper.prepend(`<div class="widget-head">${header}</div>`).addClass("widget-title-padding");
            }
            $(this.widgetContainer).append($widgetWrapper);
            this.widgetNodes.push($widgetWrapper[0]);
        });
    }
    /**
     * 获取网格单位宽高
     */
    getUnitSize() {
        let totalWidth = $(this.widgetContainer).width();
        let cols = this.cols;
        let unitSize = {
            height: totalWidth / cols,
            width: totalWidth / cols
        };
        return unitSize;
    }
    /**
     * 更新显示模式
     */
    updateDisplayMode(gridUnitSize) {
        if (!this.flowThreshold.matches) {
            let containerHeight = this.rows * gridUnitSize.height + "px";
            $(this.widgetContainer)
                .css("position", "relative")
                .css("height", containerHeight).removeClass("widget-container-flow").addClass("widget-container-grid");
            $(this.widgetContainer).find(">div").css("position", "absolute");
            return LayoutMode.grid;
        }
        else {
            $(this.widgetContainer).removeAttr("style").addClass("widget-container-flow").removeClass("widget-container-grid");
            $(this.widgetContainer).find(">div").removeAttr("style");
            return LayoutMode.flow;
        }
    }
    /**
     * 更新小组件样式
     */
    updateWidgetStyle(widget, widgetIndex, unitSize) {
        if (isGrid(this.displayMode)) {
            let widgetConfig = this.widgetConfigs[widgetIndex];
            $(this.widgetNodes[widgetIndex]).css("top", widgetConfig.position.row * unitSize.height + "px")
                .css("left", widgetConfig.position.col * unitSize.width + "px")
                .css("width", widgetConfig.position.colspan * unitSize.width + "px")
                .css("height", widgetConfig.position.rowspan * unitSize.height + "px");
        }
    }
    /**
     * 更新小组件样式
     */
    updateWidgetStyles(gridUnitSize) {
        this.widgets.forEach((widget, idx) => {
            this.updateWidgetStyle(widget, idx, gridUnitSize);
        });
    }
    /**
     * 刷新视图
     */
    refreshView(notifyChange) {
        let gridUnitSize = this.getUnitSize();
        this.displayMode = this.updateDisplayMode(gridUnitSize);
        this.updateWidgetStyles(gridUnitSize);
        if (notifyChange) {
            this.notifyWidgetsSizeChange(this.displayMode);
        }
    }
    notifyWidgetsSizeChange(layoutMode) {
        this.widgets.forEach((w, idx) => {
            let wrapper = this.widgetNodes[idx];
            w.onSizeChange({
                layoutMode: layoutMode,
                wrapper: wrapper,
                element: $(wrapper).find(".widget").get(0)
            });
        });
    }
}
//# sourceMappingURL=WidgetContainer.js.map