/**
 * 布局模式
 */
export declare enum LayoutMode {
    /**
     * 网格布局
     */
    grid = 0,
    /**
     * 流式布局
     */
    flow = 1
}
/**
 * 是否为网格布局
 * @param mode
 */
export declare function isGrid(mode: LayoutMode): boolean;
/**
 * 是否为流式布局
 * @param mode
 */
export declare function isFlow(mode: LayoutMode): boolean;
