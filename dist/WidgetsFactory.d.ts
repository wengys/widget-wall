import { WidgetDefinition, WidgetInstance, WidgetConfigStub } from "./WidgetInstance";
import { WidgetConfig } from "./WidgetConfig";
import { WidgetRuntime } from "./WidgetRuntime";
import { WidgetSection } from "./WidgetSection";
export declare class WidgetsFactory {
    private widgetFactories;
    constructor(widgetFactories: WidgetDefinition[]);
    create(instanceConfig: WidgetConfig, runtime: WidgetRuntime): WidgetInstance;
    createStub(widgetType: string, instanceConfig?: WidgetSection): WidgetConfigStub;
}
