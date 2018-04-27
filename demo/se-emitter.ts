export interface EventCallback { (...args: any[]): void; }
interface EventStorage {
    [indexer: string]: EventCallback[]
}
export abstract class SimpleEventEmitter {
    private _events: EventStorage = {}
    public on(event: string, callback: EventCallback): void {
        let events = this._events[event] || (this._events[event] = []);
        events.push(callback)
    };
    protected trigger(event: string, ...args: any[]): void {
        var events = this._events[event]; //特定事件处理
        if (events) {
            let eventCount = events.length;

            for (let i = 0; i < eventCount; i++) {
                let ev = events[i];
                ev.apply(this, args);
            }
        }
    }
    protected relayEvents(otherSource: SimpleEventEmitter, relayEventsMapping: {[indexer:string]:string}) {
        for (let index in relayEventsMapping) {
            if (relayEventsMapping.hasOwnProperty(index)) {
                let mappedIndex = relayEventsMapping[index];
                otherSource.on(index, (...args: any[]) => {
                    this.trigger(mappedIndex, ...args);
                })
            }
        }
    }
}