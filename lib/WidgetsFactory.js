"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetsFactory = void 0;

var util = _interopRequireWildcard(require("./util"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WidgetsFactory =
/*#__PURE__*/
function () {
  function WidgetsFactory(widgetFactories) {
    _classCallCheck(this, WidgetsFactory);

    _defineProperty(this, "widgetFactories", void 0);

    this.widgetFactories = widgetFactories;
  }

  _createClass(WidgetsFactory, [{
    key: "create",
    value: function create(instanceConfig) {
      var widgetType = instanceConfig.type;
      var factory = util.firstOrNull(this.widgetFactories, function (w) {
        return w.type == widgetType;
      });

      if (!factory) {
        throw new Error("unknown widget: " + widgetType);
      }

      var instance = factory.createInstance();
      return instance;
    }
  }, {
    key: "createStub",
    value: function createStub(widgetType, instanceConfig) {
      var factory = util.firstOrNull(this.widgetFactories, function (w) {
        return w.type == widgetType;
      });

      if (!factory) {
        throw new Error("unknown widget: " + widgetType);
      }

      var instance = factory.createConfigStub(instanceConfig);
      return instance;
    }
  }]);

  return WidgetsFactory;
}();

exports.WidgetsFactory = WidgetsFactory;
//# sourceMappingURL=WidgetsFactory.js.map