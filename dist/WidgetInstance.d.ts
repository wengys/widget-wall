import { WidgetRuntime } from "./WidgetRuntime";
import { WidgetConfig } from "./WidgetConfig";
import { WidgetSection } from "./WidgetSection";
import { SimpleEventEmitter } from "se-emitter";
/**
 * 小组件实例
 */
export interface WidgetInstance extends WidgetConfig {
    catalogText: string;
    typeText: string;
    render(container: HTMLDivElement): PromiseLike<void>;
    bind(runtime: WidgetRuntime): void;
}
/**
 * 小组件配置用桩
 */
export interface WidgetConfigStub {
    catalog: string;
    type: string;
    catalogText: string;
    typeText: string;
    bind(source: SimpleEventEmitter): void;
    render(container: HTMLDivElement): void;
    toProfile(): WidgetSection;
    row: number;
    col: number;
    rowspan: number;
    colspan: number;
}
/**
 * 小组件定义
 */
export interface WidgetDefinition {
    catalog: string;
    type: string;
    /**
     * 创建小组件实例
     */
    createInstance(config: WidgetConfig): WidgetInstance;
    /**
     * 创建配置用桩
     */
    createConfigStub(config?: WidgetSection): WidgetConfigStub;
}
