"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetContainer = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _WidgetsFactory = require("./WidgetsFactory");

var _LayoutMode = require("./LayoutMode");

var _seEmitter = require("se-emitter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 小组件容器
 */
var WidgetContainer =
/*#__PURE__*/
function (_SimpleEventEmitter) {
  function WidgetContainer(widgetContainer, widgetDefinitions) {
    var _this;

    _classCallCheck(this, WidgetContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WidgetContainer).call(this));

    _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cols", 24), "flowThreshold", void 0), "rows", 0), "widgets", []), "widgetNodes", []), "widgetConfigs", []), "displayMode", _LayoutMode.LayoutMode.grid), "widgetsFactory", void 0);

    _this.widgetsFactory = new _WidgetsFactory.WidgetsFactory(widgetDefinitions);
    _this.flowThreshold = window.matchMedia((0, _jquery.default)(_this.widgetContainer).data("flow-threshold"));
    (0, _jquery.default)(_this.widgetContainer).addClass("widget-container");
    return _this;
  }
  /**
   * 初始化
   * @param widgets 小组件
   */


  _createClass(WidgetContainer, [{
    key: "init",
    value: function init(containerConfig) {
      var _this2 = this;

      this.rows = containerConfig.rows;
      this.cols = containerConfig.cols;
      this.widgetConfigs = containerConfig.widgets;
      this.destroy();

      if (containerConfig.maxWidth) {
        (0, _jquery.default)(this.widgetContainer).css("maxWidth", containerConfig.maxWidth);
      } else {
        (0, _jquery.default)(this.widgetContainer).css("maxWidth", "");
      }

      if (containerConfig.minWidth) {
        (0, _jquery.default)(this.widgetContainer).css("minWidth", containerConfig.minWidth);
      } else {
        (0, _jquery.default)(this.widgetContainer).css("minWidth", "");
      }

      this.widgets = containerConfig.widgets.map(function (wcfg) {
        return _this2.widgetsFactory.create(wcfg
        /*, this*/
        );
      });
      this.widgetNodes = [];
      this.render();
      (0, _jquery.default)(window).on("resize", function () {
        _this2.refreshView(true);
      });
    }
    /**
     * 销毁小组件
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      this.widgets.forEach(function (w, idx) {
        var ev = {
          element: _this3.widgetNodes[idx]
        };
        w.onDestroy(ev);
      });
      (0, _jquery.default)(this.widgetContainer).empty();
    }
    /**
     * 渲染小组件
     * @param widgets
     */

  }, {
    key: "render",
    value: function render() {
      this.appendWidgetNodes(this.widgets);
      this.refreshView(false);
      this.renderWidgets(this.widgets);
    }
  }, {
    key: "renderWidgets",
    value: function renderWidgets(widgets) {
      var _this4 = this;

      widgets.forEach(function (widget, idx) {
        var $widgetWrapper = (0, _jquery.default)(_this4.widgetNodes[idx]);
        var widgetConfig = _this4.widgetConfigs[idx];
        var $widget = $widgetWrapper.find(".widget");
        var renderOptions = {
          config: widgetConfig,
          layoutMode: _this4.displayMode,
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

  }, {
    key: "appendWidgetNodes",
    value: function appendWidgetNodes(widgets) {
      var _this5 = this;

      widgets.forEach(function (widget) {
        var $widgetWrapper = (0, _jquery.default)("<div class=\"widget-wrapper\"><div class=\"widget widget-".concat(widget.type, "\"></div></div>"));
        var $widget = (0, _jquery.default)($widgetWrapper.find(".widget").get(0));
        var header = widget.header;

        if (header) {
          $widgetWrapper.prepend("<div class=\"widget-head\">".concat(header, "</div>")).addClass("widget-title-padding");
        }

        (0, _jquery.default)(_this5.widgetContainer).append($widgetWrapper);

        _this5.widgetNodes.push($widgetWrapper[0]);
      });
    }
    /**
     * 获取网格单位宽高
     */

  }, {
    key: "getUnitSize",
    value: function getUnitSize() {
      var totalWidth = (0, _jquery.default)(this.widgetContainer).width();
      var cols = this.cols;
      var unitSize = {
        height: totalWidth / cols,
        width: totalWidth / cols
      };
      return unitSize;
    }
    /**
     * 更新显示模式
     */

  }, {
    key: "updateDisplayMode",
    value: function updateDisplayMode(gridUnitSize) {
      if (!this.flowThreshold.matches) {
        var containerHeight = this.rows * gridUnitSize.height + "px";
        (0, _jquery.default)(this.widgetContainer).css("position", "relative").css("height", containerHeight).removeClass("widget-container-flow").addClass("widget-container-grid");
        (0, _jquery.default)(this.widgetContainer).find(">div").css("position", "absolute");
        return _LayoutMode.LayoutMode.grid;
      } else {
        (0, _jquery.default)(this.widgetContainer).removeAttr("style").addClass("widget-container-flow").removeClass("widget-container-grid");
        (0, _jquery.default)(this.widgetContainer).find(">div").removeAttr("style");
        return _LayoutMode.LayoutMode.flow;
      }
    }
    /**
     * 更新小组件样式
     */

  }, {
    key: "updateWidgetStyle",
    value: function updateWidgetStyle(widget, widgetIndex, unitSize) {
      if ((0, _LayoutMode.isGrid)(this.displayMode)) {
        var widgetConfig = this.widgetConfigs[widgetIndex];
        (0, _jquery.default)(this.widgetNodes[widgetIndex]).css("top", widgetConfig.position.row * unitSize.height + "px").css("left", widgetConfig.position.col * unitSize.width + "px").css("width", widgetConfig.position.colspan * unitSize.width + "px").css("height", widgetConfig.position.rowspan * unitSize.height + "px");
      }
    }
    /**
     * 更新小组件样式
     */

  }, {
    key: "updateWidgetStyles",
    value: function updateWidgetStyles(gridUnitSize) {
      var _this6 = this;

      this.widgets.forEach(function (widget, idx) {
        _this6.updateWidgetStyle(widget, idx, gridUnitSize);
      });
    }
    /**
     * 刷新视图
     */

  }, {
    key: "refreshView",
    value: function refreshView(notifyChange) {
      var gridUnitSize = this.getUnitSize();
      this.displayMode = this.updateDisplayMode(gridUnitSize);
      this.updateWidgetStyles(gridUnitSize);

      if (notifyChange) {
        this.notifyWidgetsSizeChange(this.displayMode);
      }
    }
  }, {
    key: "notifyWidgetsSizeChange",
    value: function notifyWidgetsSizeChange(layoutMode) {
      var _this7 = this;

      this.widgets.forEach(function (w, idx) {
        var wrapper = _this7.widgetNodes[idx];
        w.onSizeChange({
          layoutMode: layoutMode,
          wrapper: wrapper,
          element: (0, _jquery.default)(wrapper).find(".widget").get(0)
        });
      });
    }
  }]);

  _inherits(WidgetContainer, _SimpleEventEmitter);

  return WidgetContainer;
}(_seEmitter.SimpleEventEmitter);

exports.WidgetContainer = WidgetContainer;
//# sourceMappingURL=WidgetContainer.js.map