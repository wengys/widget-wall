"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstOrNull = firstOrNull;

function firstOrNull(array, filter) {
  for (var index = 0; index < array.length; index++) {
    var element = array[index];

    if (filter(element)) {
      return element;
    }
  }

  return null;
}
//# sourceMappingURL=util.js.map