import * as util from "./util";
var WidgetsFactory = /** @class */ (function () {
    function WidgetsFactory(widgetFactories) {
        this.widgetFactories = widgetFactories;
    }
    WidgetsFactory.prototype.create = function (instanceConfig) {
        var widgetType = instanceConfig.type;
        var factory = util.firstOrNull(this.widgetFactories, function (w) { return w.type == widgetType; });
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        var instance = factory.createInstance();
        return instance;
    };
    WidgetsFactory.prototype.createStub = function (widgetType, instanceConfig) {
        var factory = util.firstOrNull(this.widgetFactories, function (w) { return w.type == widgetType; });
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        var instance = factory.createConfigStub(instanceConfig);
        return instance;
    };
    return WidgetsFactory;
}());
export { WidgetsFactory };
//# sourceMappingURL=WidgetsFactory.js.map