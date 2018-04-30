/**
 * 布局模式
 */
export var LayoutMode;
(function (LayoutMode) {
    /**
     * 网格布局
     */
    LayoutMode[LayoutMode["grid"] = 0] = "grid";
    /**
     * 流式布局
     */
    LayoutMode[LayoutMode["flow"] = 1] = "flow";
})(LayoutMode || (LayoutMode = {}));
/**
 * 是否为网格布局
 * @param mode
 */
export function isGrid(mode) {
    return mode === LayoutMode.grid;
}
/**
 * 是否为流式布局
 * @param mode
 */
export function isFlow(mode) {
    return mode === LayoutMode.flow;
}
//# sourceMappingURL=LayoutMode.js.map