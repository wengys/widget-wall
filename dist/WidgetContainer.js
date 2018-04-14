var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as $ from "jquery";
import { WidgetsFactory } from "./WidgetsFactory";
import { LayoutMode, isGrid } from "./LayoutMode";
import { SimpleEventEmitter } from "se-emitter";
/**
 * 小组件容器
 */
var WidgetContainer = (function (_super) {
    __extends(WidgetContainer, _super);
    function WidgetContainer(widgetContainerId, widgetDefinitions) {
        var _this = _super.call(this) || this;
        _this.widgetContainerId = widgetContainerId;
        _this.cols = 24;
        _this.rows = 0;
        _this.widgets = [];
        _this.widgetNodes = [];
        _this.widgetConfigs = [];
        _this.displayMode = LayoutMode.grid;
        _this.widgetsFactory = new WidgetsFactory(widgetDefinitions);
        _this.flowThreshold = window.matchMedia($(_this.widgetContainerId).data("flow-threshold"));
        $(_this.widgetContainerId).addClass("widget-container");
        return _this;
    }
    /**
     * 初始化
     * @param widgets 小组件
     */
    WidgetContainer.prototype.init = function (containerConfig) {
        var _this = this;
        this.rows = containerConfig.rows;
        this.cols = containerConfig.cols;
        this.widgetConfigs = containerConfig.widgets;
        if (containerConfig.maxWidth) {
            $(this.widgetContainerId).css("maxWidth", containerConfig.maxWidth);
        }
        if (containerConfig.minWidth) {
            $(this.widgetContainerId).css("minWidth", containerConfig.minWidth);
        }
        this.widgets = containerConfig.widgets.map(function (wcfg) { return _this.widgetsFactory.create(wcfg /*, this*/); });
        this.widgetNodes = [];
        this.render();
        $(window).on("resize", function () {
            _this.refreshView(true);
        });
    };
    /**
     * 渲染小组件
     * @param widgets
     */
    WidgetContainer.prototype.render = function () {
        this.appendWidgetNodes(this.widgets);
        this.refreshView(false);
        this.renderWidgets(this.widgets);
    };
    WidgetContainer.prototype.renderWidgets = function (widgets) {
        var _this = this;
        widgets.forEach(function (widget, idx) {
            var $widgetWrapper = $(_this.widgetNodes[idx]);
            var widgetConfig = _this.widgetConfigs[idx];
            var $widget = $widgetWrapper.find(".widget");
            var renderOptions = {
                config: widgetConfig,
                layoutMode: _this.displayMode,
                wrapper: $widgetWrapper.get(0),
                element: $widget.get(0)
            };
            widget.init(renderOptions.element, renderOptions);
        });
    };
    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    WidgetContainer.prototype.appendWidgetNodes = function (widgets) {
        var _this = this;
        widgets.forEach(function (widget) {
            var $widgetWrapper = $("<div class=\"widget-wrapper\"><div class=\"widget widget-" + widget.type + "\"></div></div>");
            var $widget = $($widgetWrapper.find(".widget").get(0));
            var header = widget.header;
            if (header) {
                $widgetWrapper.prepend("<div class=\"widget-head\">" + header + "</div>").addClass("widget-title-padding");
            }
            $(_this.widgetContainerId).append($widgetWrapper);
            _this.widgetNodes.push($widgetWrapper[0]);
        });
    };
    /**
     * 获取网格单位宽高
     */
    WidgetContainer.prototype.getUnitSize = function () {
        var totalWidth = $(this.widgetContainerId).width();
        var cols = this.cols;
        var unitSize = {
            height: totalWidth / cols,
            width: totalWidth / cols
        };
        return unitSize;
    };
    /**
     * 更新显示模式
     */
    WidgetContainer.prototype.updateDisplayMode = function (gridUnitSize) {
        if (!this.flowThreshold.matches) {
            var containerHeight = this.rows * gridUnitSize.height + "px";
            $(this.widgetContainerId)
                .css("position", "relative")
                .css("height", containerHeight).removeClass("widget-container-flow").addClass("widget-container-grid");
            $(this.widgetContainerId).find(">div").css("position", "absolute");
            return LayoutMode.grid;
        }
        else {
            $(this.widgetContainerId).removeAttr("style").addClass("widget-container-flow").removeClass("widget-container-grid");
            $(this.widgetContainerId).find(">div").removeAttr("style");
            return LayoutMode.flow;
        }
    };
    /**
     * 更新小组件样式
     */
    WidgetContainer.prototype.updateWidgetStyle = function (widget, widgetIndex, unitSize) {
        if (isGrid(this.displayMode)) {
            var widgetConfig = this.widgetConfigs[widgetIndex];
            $(this.widgetNodes[widgetIndex]).css("top", widgetConfig.position.row * unitSize.height + "px")
                .css("left", widgetConfig.position.col * unitSize.width + "px")
                .css("width", widgetConfig.position.colspan * unitSize.width + "px")
                .css("height", widgetConfig.position.rowspan * unitSize.height + "px");
        }
    };
    /**
     * 更新小组件样式
     */
    WidgetContainer.prototype.updateWidgetStyles = function (gridUnitSize) {
        var _this = this;
        this.widgets.forEach(function (widget, idx) {
            _this.updateWidgetStyle(widget, idx, gridUnitSize);
        });
    };
    /**
     * 刷新视图
     */
    WidgetContainer.prototype.refreshView = function (notifyChange) {
        var gridUnitSize = this.getUnitSize();
        this.displayMode = this.updateDisplayMode(gridUnitSize);
        this.updateWidgetStyles(gridUnitSize);
        if (notifyChange) {
            this.notifyWidgetsSizeChange(this.displayMode);
        }
    };
    WidgetContainer.prototype.notifyWidgetsSizeChange = function (layoutMode) {
        var _this = this;
        this.widgets.forEach(function (w, idx) {
            var wrapper = _this.widgetNodes[idx];
            w.onSizeChange({
                layoutMode: layoutMode,
                wrapper: wrapper,
                element: $(wrapper).find(".widget").get(0)
            });
        });
    };
    return WidgetContainer;
}(SimpleEventEmitter));
export { WidgetContainer };
//# sourceMappingURL=WidgetContainer.js.map