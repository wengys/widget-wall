var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { SimpleEventEmitter } from "se-emitter";
import { WidgetRuntimeEvents } from "./WidgetRuntimeEvents";
/**
 * 小组件运行时
 */
var WidgetRuntime = (function (_super) {
    __extends(WidgetRuntime, _super);
    function WidgetRuntime(ctx) {
        var _this = _super.call(this) || this;
        _this._context = ctx;
        return _this;
    }
    WidgetRuntime.prototype.getContext = function (key) {
        return this._context[key];
    };
    WidgetRuntime.prototype.setContext = function (key, value, raiseEvent) {
        if (raiseEvent === void 0) { raiseEvent = false; }
        var oldValue = this._context[key];
        this._context[key] = value;
        if (raiseEvent) {
            this.trigger(WidgetRuntimeEvents.runtime.contextUpdate, key, value, oldValue);
        }
    };
    WidgetRuntime.prototype.notifyWidgetsSizeChange = function (displayMode) {
        this.trigger(WidgetRuntimeEvents.runtime.widgetSizeChange, displayMode);
    };
    return WidgetRuntime;
}(SimpleEventEmitter));
export { WidgetRuntime };
//# sourceMappingURL=WidgetRuntime.js.map