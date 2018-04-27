import { WidgetContainerConfig } from "./WidgetConfig";
import { WidgetDefinition } from "./WidgetInstance";
import { SimpleEventEmitter } from "se-emitter";
/**
 * 小组件容器
 */
export declare class WidgetContainer extends SimpleEventEmitter {
    private widgetContainer;
    private cols;
    private flowThreshold;
    private rows;
    private widgets;
    private widgetNodes;
    private widgetConfigs;
    private displayMode;
    private widgetsFactory;
    constructor(widgetContainer: string | HTMLDivElement, widgetDefinitions: WidgetDefinition[]);
    /**
     * 初始化
     * @param widgets 小组件
     */
    init(containerConfig: WidgetContainerConfig): void;
    /**
     * 销毁小组件
     */
    destroy(): void;
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
    private updateWidgetStyle(widget, widgetIndex, unitSize);
    /**
     * 更新小组件样式
     */
    private updateWidgetStyles(gridUnitSize);
    /**
     * 刷新视图
     */
    private refreshView(notifyChange);
    private notifyWidgetsSizeChange(layoutMode);
}
