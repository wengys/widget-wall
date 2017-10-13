import { SimpleEventEmitter } from "se-emitter";
import { LayoutMode } from "./LayoutMode";
/**
 * С�������ʱ
 */
export declare abstract class WidgetRuntime extends SimpleEventEmitter {
    private _context;
    constructor(ctx: {
        [indexer: string]: any;
    });
    readonly context: {
        [indexer: string]: any;
    };
    setContext(key: string, value: any, raiseEvent?: boolean): void;
    notifyWidgetsSizeChange(displayMode: LayoutMode): void;
}
