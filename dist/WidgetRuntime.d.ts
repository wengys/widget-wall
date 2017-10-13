import { SimpleEventEmitter } from "se-emitter";
import { LayoutMode } from "./LayoutMode";
/**
 * 小组件运行时
 */
export declare abstract class WidgetRuntime extends SimpleEventEmitter {
    private _context;
    constructor(ctx: {
        [indexer: string]: any;
    });
    getContext(): {
        [indexer: string]: any;
    };
    setContext(key: string, value: any, raiseEvent?: boolean): void;
    notifyWidgetsSizeChange(displayMode: LayoutMode): void;
}
