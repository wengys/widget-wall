import { SimpleEventEmitter } from "se-emitter";
import { LayoutMode } from "./LayoutMode"
import { WidgetRuntimeEvents } from "./WidgetRuntimeEvents";


/**
 * 小组件运行时
 */
export abstract class WidgetRuntime extends SimpleEventEmitter {
    private _context: { [indexer: string]: any }

    constructor(ctx: { [indexer: string]: any }) {
        super();
        this._context = ctx
    }
    getContext(key:string) {
        return this._context[key];
    }
    setContext(key: string, value: any, raiseEvent = false) {
        let oldValue = this._context[key];
        this._context[key] = value
        if (raiseEvent) {
            this.trigger(WidgetRuntimeEvents.runtime.contextUpdate, key, value, oldValue);
        }
    }
    notifyWidgetsSizeChange(displayMode: LayoutMode): void {
        this.trigger(WidgetRuntimeEvents.runtime.widgetSizeChange, displayMode)
    }
}