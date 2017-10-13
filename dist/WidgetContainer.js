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
import * as _ from "underscore";
import { WidgetsFactory } from "./WidgetsFactory";
import { WidgetRuntime } from "./WidgetRuntime";
import { LayoutMode, isGrid } from "./LayoutMode";
import { WidgetRuntimeEvents } from "./WidgetRuntimeEvents";
/**
 * 小组件容器
 */
var WidgetContainer = /** @class */ (function (_super) {
    __extends(WidgetContainer, _super);
    function WidgetContainer(widgetContainerId, widgetDefinitions, context) {
        var _this = _super.call(this, context) || this;
        _this.widgetContainerId = widgetContainerId;
        _this.widgets = [];
        _this.widgetsFactory = new WidgetsFactory(widgetDefinitions);
        _this.flowThreshold = window.matchMedia($(_this.widgetContainerId).data("flow-threshold"));
        $(_this.widgetContainerId).addClass("widget-container");
        return _this;
        // this.initTooltip();
    }
    /**
     * 初始化
     * @param widgets 小组件
     */
    WidgetContainer.prototype.init = function (widgetConfig) {
        var _this = this;
        this.rows = widgetConfig.rows;
        //TODO: 根据权限过滤
        this.widgets = _.map(widgetConfig.widgets, function (wcfg) { return _this.widgetsFactory.create(wcfg, _this); });
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
        _.each(widgets, function (widget) {
            var $widgetContainer = $("#" + widget.id);
            var $widget = $($widgetContainer.find(".widget").get(0));
            widget.render($widget.get(0)).then(function () {
                $widget.removeClass("widget-loading");
                _this.trigger(WidgetRuntimeEvents.runtime.widgetRenderComplete, widget);
            });
        });
    };
    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    WidgetContainer.prototype.appendWidgetNodes = function (widgets) {
        var _this = this;
        _.each(widgets, function (widget) {
            var $widgetContainer = $("<div id=\"" + widget.id + "\" class=\"widget-wrapper\"><div class=\"widget widget-catalog-" + widget.catalog + " widget-" + widget.type + " widget-loading\"></div></div>");
            var $widget = $($widgetContainer.find(".widget").get(0));
            if (widget.typeText) {
                $widgetContainer.prepend("<div class=\"widget-head\">" + widget.typeText + "</div>").addClass("widget-title-padding");
            }
            $(_this.widgetContainerId).append($widgetContainer);
        });
    };
    /**
     * 获取网格单位宽高
     */
    WidgetContainer.prototype.getUnitSize = function () {
        var totalWidth = $(this.widgetContainerId).width();
        var cols = $(this.widgetContainerId).data("cols") - 0 || WidgetContainer.defaultCols;
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
    WidgetContainer.prototype.updateWidgetStyle = function (widget, unitSize) {
        if (isGrid(this.displayMode)) {
            $("#" + widget.id).css("top", widget.display.row * unitSize.height + "px")
                .css("left", widget.display.col * unitSize.width + "px")
                .css("width", widget.display.colspan * unitSize.width + "px")
                .css("height", widget.display.rowspan * unitSize.height + "px");
        }
    };
    /**
     * 更新小组件样式
     */
    WidgetContainer.prototype.updateWidgetStyles = function (gridUnitSize) {
        var _this = this;
        _.each(this.widgets, function (widget) {
            _this.updateWidgetStyle(widget, gridUnitSize);
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
    WidgetContainer.defaultCols = 24;
    return WidgetContainer;
}(WidgetRuntime));
export { WidgetContainer };
//# sourceMappingURL=WidgetContainer.js.map