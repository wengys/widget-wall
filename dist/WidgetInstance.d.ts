import { WidgetConfig } from "./WidgetConfig";
import { LayoutMode } from "./LayoutMode";
/**
 * 小组件实例
 */
export interface WidgetInstance {
    header: string;
    init(element: HTMLDivElement, renderOptions: InstanceInitOptions): void;
    onSizeChange(ev: SizeChangeEventArgs): void;
    onDestroy(ev: DestroyEventArgs): void;
    type: string;
}
export declare type DestroyEventArgs = {
    element: HTMLDivElement;
};
export declare type SizeChangeEventArgs = {
    layoutMode: LayoutMode;
    wrapper: HTMLDivElement;
    element: HTMLDivElement;
};
export declare type InstanceInitOptions = {
    config: WidgetConfig;
    layoutMode: LayoutMode;
    wrapper: HTMLDivElement;
    element: HTMLDivElement;
};
/**
 * 小组件配置用桩
 */
export interface WidgetConfigStub {
    type: string;
    position: Position;
    init(container: HTMLDivElement, options: ConfigInitOptions): void;
    serialize(): WidgetConfig;
}
export declare type ConfigInitOptions = {
    config?: WidgetConfig;
    wrapper: HTMLDivElement;
    element: HTMLDivElement;
};
/**
 * 小组件定义
 */
export interface WidgetDefinition {
    type: string;
    /**
     * 创建小组件实例
     */
    createInstance(): WidgetInstance;
    /**
     * 创建配置用桩
     */
    createConfigStub(config?: WidgetConfig): WidgetConfigStub;
}
