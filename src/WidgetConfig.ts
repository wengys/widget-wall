/**
 * 小组件容器配置
 */
export interface WidgetContainerConfig {
    rows: number,
    cols: number,
    maxWidth?: number,
    minWidth?: number,
    widgets: WidgetConfig[]
}

export interface WidgetConfig {
    type: string
    position: WidgetPosition
    properties: {[indexer:string]:string}
}

export interface WidgetPosition {
    row: number,
    col: number,
    rowspan: number,
    colspan: number
}