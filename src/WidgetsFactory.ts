import { WidgetDefinition, WidgetInstance, WidgetConfigStub } from "./WidgetInstance";
import * as util from "./util"
import { WidgetConfig } from "./WidgetConfig";

export class WidgetsFactory {
    private widgetFactories: WidgetDefinition[];

    constructor(widgetFactories: WidgetDefinition[]) {
        this.widgetFactories = widgetFactories;
    }

    public create(instanceConfig: WidgetConfig): WidgetInstance {
        let widgetType = instanceConfig.type;
        let factory = util.firstOrNull(this.widgetFactories,(w)=>w.type == widgetType)
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createInstance();
        return instance;
    }

    public createStub(widgetType: string, instanceConfig?: WidgetConfig): WidgetConfigStub {
        let factory = util.firstOrNull(this.widgetFactories,(w)=>w.type == widgetType)        
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createConfigStub(instanceConfig);
        return instance
    }
}