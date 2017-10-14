import { WidgetRuntime } from "./WidgetRuntime"
import { WidgetConfig, WidgetSize } from "./WidgetConfig";
import { WidgetSection } from "./WidgetSection";
import { SimpleEventEmitter } from "se-emitter"
/**
 * 小组件实例
 */
export interface WidgetInstance extends WidgetConfig {
    catelogText: string
    typeText: string
    render(container: HTMLDivElement): PromiseLike<void>;
    bind(runtime: WidgetRuntime): void;
}

/**
 * 小组件配置用桩
 */
export interface WidgetConfigStub {
    catelog: string
    type: string
    catelogText: string
    typeText: string
    bind(source: SimpleEventEmitter): void
    render(container: HTMLDivElement): void
    toProfile(): WidgetSection
    //commands: string[]
    //executeCommand(command: string): void
    //availableSizes: WidgetSize[]
    getRow(): number
    getCol(): number
    getRowspan(): number
    getColspan(): number
    setRow(value:number): void
    setCol(value:number): void
    setRowspan(value:number): void
    setColspan(value:number): void
}

/**
 * 小组件定义
 */
export interface WidgetDefinition {
    catelog: string
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