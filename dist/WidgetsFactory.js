import * as _ from "underscore";
var WidgetsFactory = /** @class */ (function () {
    function WidgetsFactory(widgetFactories) {
        this.widgetFactories = widgetFactories;
    }
    WidgetsFactory.prototype.create = function (instanceConfig, runtime) {
        var widgetType = instanceConfig.type;
        var factory = _.find(this.widgetFactories, function (w) { return w.type == widgetType; });
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        var instance = factory.createInstance(instanceConfig);
        instance.bind(runtime);
        return instance;
    };
    WidgetsFactory.prototype.createStub = function (widgetType, instanceConfig) {
        var factory = _.find(this.widgetFactories, function (w) { return w.type == widgetType; });
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