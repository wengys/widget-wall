"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGrid = isGrid;
exports.isFlow = isFlow;
exports.LayoutMode = void 0;

/**
* 布局模式
*/
var LayoutMode;
/**
 * 是否为网格布局
 * @param mode
 */

exports.LayoutMode = LayoutMode;

(function (LayoutMode) {
  LayoutMode[LayoutMode["grid"] = 0] = "grid";
  LayoutMode[LayoutMode["flow"] = 1] = "flow";
})(LayoutMode || (exports.LayoutMode = LayoutMode = {}));

function isGrid(mode) {
  return mode === LayoutMode.grid;
}
/**
 * 是否为流式布局
 * @param mode
 */


function isFlow(mode) {
  return mode === LayoutMode.flow;
}
//# sourceMappingURL=LayoutMode.js.map