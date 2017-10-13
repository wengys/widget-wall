/**
 * 小组件展示配置（与api获取的配置有微妙的不同）
 */

/**
 * 小组件容器配置
 */
export interface WidgetContainerConfig {
    rows: number,
    widgets: WidgetConfig[]
}

/**
 * 小组件尺寸
 */
export interface WidgetSize {
    colspan: number
    rowspan: number
}

/**
 * 小组件展示配置
 */
export interface WidgetDisplayConfig extends WidgetSize {
    row: number
    col: number
    
}

/**
 * 小组件配置
 */
export interface WidgetConfig {
    getId(): string
    getCatalog(): string
    //catalogText: string
    getType(): string
    //typeText: string
    getDisplay(): WidgetDisplayConfig
}