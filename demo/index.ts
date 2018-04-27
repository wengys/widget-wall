import * as WidgetWall from "../src/index"
import { InstanceInitOptions } from "../src/index";

class DummyInstance implements WidgetWall.WidgetInstance {
    onDestroy(ev: WidgetWall.DestroyEventArgs): void {
        console.log("destroy")
    }
    onSizeChange(ev: WidgetWall.SizeChangeEventArgs): void {
        let oh = ev.wrapper.offsetHeight;
        let ow = ev.wrapper.offsetWidth;
        console.log(oh,ow)
    }
    header = "dummy";
    colors = ["red", "yellow", "orange", "blue"]
    static count = 0;
   
    init(element:HTMLDivElement, renderOptions:InstanceInitOptions): void {
        let container = element;
        container.innerHTML = "dummy"
        let color = this.colors[DummyInstance.count++]
        if (DummyInstance.count == this.colors.length) DummyInstance.count = 0
        container.style.backgroundColor = color;
        (container.parentElement as HTMLElement).style.backgroundColor = color;
    }
    
    type: string = "dummy";
}

class DummyDefinition implements WidgetWall.WidgetDefinition {
    type: string = "dummy";
    createInstance(): WidgetWall.WidgetInstance {
        return new DummyInstance()
    }
    createConfigStub(config?: WidgetWall.WidgetConfig | undefined): WidgetWall.WidgetConfigStub {
        throw new Error("Method not implemented.");
    }
}

let container = new WidgetWall.WidgetContainer("#container", [new DummyDefinition()])
let container2 = new WidgetWall.WidgetContainer("#container2", [new DummyDefinition()])

let cfg: WidgetWall.WidgetContainerConfig = {
    rows: 6,
    cols: 24,
    maxWidth: 960,
    minWidth: 640,
    widgets: [{
        type: "dummy",
        position: {
            row: 0,
            rowspan: 6,
            col: 0,
            colspan: 6
        },
        properties: {}
    },
    {
        type: "dummy",
        position: {
            row: 0,
            rowspan: 6,
            col: 6,
            colspan: 6
        },
        properties: {}
    }, {
        type: "dummy",
        position: {
            row: 0,
            rowspan: 6,
            col: 12,
            colspan: 6
        },
        properties: {}
    },
    {
        type: "dummy",
        position: {
            row: 0,
            rowspan: 6,
            col: 18,
            colspan: 6
        },
        properties: {}
    }
    ]
}

container.init(cfg)
let cfg2 = Object.create(cfg)
cfg2.cols = 26
cfg2.maxWidth = null
cfg2.minWidth = null
container2.init(cfg2)

function destroy() {
    container.destroy()
}

function load() {
    container.init(cfg2)
}

document.getElementById("destroy")!.addEventListener("click",destroy);
document.getElementById("load")!.addEventListener("click",load);
