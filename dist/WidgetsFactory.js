import * as util from "./util";
export class WidgetsFactory {
    constructor(widgetFactories) {
        this.widgetFactories = widgetFactories;
    }
    create(instanceConfig) {
        let widgetType = instanceConfig.type;
        let factory = util.firstOrNull(this.widgetFactories, (w) => w.type == widgetType);
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createInstance();
        return instance;
    }
    createStub(widgetType, instanceConfig) {
        let factory = util.firstOrNull(this.widgetFactories, (w) => w.type == widgetType);
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createConfigStub(instanceConfig);
        return instance;
    }
}
//# sourceMappingURL=WidgetsFactory.js.map