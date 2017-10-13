export interface WidgetSection {
    id: string;
    type: string;
    position: WidgetPosition;
    properties: {
        [indexer: string]: string;
    };
}
export interface WidgetPosition {
    row: number;
    col: number;
    rowspan: number;
    colspan: number;
}
