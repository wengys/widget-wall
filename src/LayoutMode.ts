/**
 * 布局模式
 */
export enum LayoutMode {
    /**
     * 网格布局
     */
    grid,
    /**
     * 流式布局
     */
    flow,
}

/**
 * 是否为网格布局
 * @param mode
 */
export function isGrid(mode: LayoutMode) {
    return mode === LayoutMode.grid
}

/**
 * 是否为流式布局
 * @param mode
 */
export function isFlow(mode: LayoutMode) {
    return mode === LayoutMode.flow
}