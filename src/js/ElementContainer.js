import NanoEvents from "./NanoEvents.js";

export class ElementContainer {

    constructor(x, y, elSize) {
        this.x = x;
        this.y = y;
        this.elementSize = elSize;
        this.elements = [];
        this.emitter = new NanoEvents();
        this.events = {
            ElementRemoved: "elementRemoved",
            ElementAdded: "elementAdded",
            Click: "click",
        }
    }

    on(event, cb) {
        this.emitter.on(event, cb);
    }

    add(element) {
        element.x = this.x + this.elements.length * this.elementSize;
        element.y = this.y;

        element.width = this.elementSize;
        element.height = this.elementSize;

        element.removeListeners();

        element.addListener("click", e => {
            this.emitter.emit(this.events.Click, element);
        });

        this.elements.push(element);
        this.emitter.emit(this.events.ElementAdded, element, this.elements.length);
        return this.elements.length;
    }

    remove(element) {
        let index = this.elements.indexOf(element);
        this.elements.splice(index, 1);
        this.emitter.emit(this.events.ElementRemoved, element);
        return index;
    }

    empty() {
        this.elements = [];
    }
}