import * as _ from "underscore"
import { WidgetDefinition, WidgetInstance, WidgetConfigStub } from "./WidgetInstance";
import { WidgetConfig } from "./WidgetConfig";
import { WidgetRuntime } from "./WidgetRuntime";
import { WidgetSection } from "./WidgetSection";

export class WidgetsFactory {
    private widgetFactories: WidgetDefinition[];

    constructor(widgetFactories: WidgetDefinition[]) {
        this.widgetFactories = widgetFactories;
    }

    public create(instanceConfig: WidgetConfig, runtime: WidgetRuntime): WidgetInstance {
        let widgetType = instanceConfig.getType();
        let factory = _.find(this.widgetFactories, (w) => w.getType() == widgetType)
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createInstance(instanceConfig);
        instance.bind(runtime)
        return instance;
    }

    public createStub(widgetType: string, instanceConfig?: WidgetSection): WidgetConfigStub {
        let factory = _.find(this.widgetFactories, (w) => w.getType() == widgetType)
        if (!factory) {
            throw new Error("unknown widget: " + widgetType);
        }
        let instance = factory.createConfigStub(instanceConfig);
        return instance
    }
}