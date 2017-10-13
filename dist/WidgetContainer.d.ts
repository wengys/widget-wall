import { WidgetRuntime } from "./WidgetRuntime";
import { WidgetContainerConfig } from "./WidgetConfig";
import { WidgetDefinition } from "./WidgetInstance";
/**
 * 小组件容器
 */
export declare class WidgetContainer extends WidgetRuntime {
    private widgetContainerId;
    private static defaultCols;
    private flowThreshold;
    private rows;
    private widgets;
    private displayMode;
    private widgetsFactory;
    constructor(widgetContainerId: string, widgetDefinitions: WidgetDefinition[], context: {
        [indexer: string]: any;
    });
    /**
     * 初始化
     * @param widgets 小组件
     */
    init(widgetConfig: WidgetContainerConfig): void;
    /**
     * 渲染小组件
     * @param widgets
     */
    private render();
    private renderWidgets(widgets);
    /**
     * 插入小组件节点
     * @param widgets 小组件
     */
    private appendWidgetNodes(widgets);
    /**
     * 获取网格单位宽高
     */
    private getUnitSize();
    /**
     * 更新显示模式
     */
    private updateDisplayMode(gridUnitSize);
    /**
     * 更新小组件样式
     */
    private updateWidgetStyle(widget, unitSize);
    /**
     * 更新小组件样式
     */
    private updateWidgetStyles(gridUnitSize);
    /**
     * 刷新视图
     */
    private refreshView(notifyChange);
}
