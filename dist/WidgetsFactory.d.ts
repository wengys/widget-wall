import { WidgetDefinition, WidgetInstance, WidgetConfigStub } from "./WidgetInstance";
import { WidgetConfig } from "./WidgetConfig";
export declare class WidgetsFactory {
    private widgetFactories;
    constructor(widgetFactories: WidgetDefinition[]);
    create(instanceConfig: WidgetConfig): WidgetInstance;
    createStub(widgetType: string, instanceConfig?: WidgetConfig): WidgetConfigStub;
}
