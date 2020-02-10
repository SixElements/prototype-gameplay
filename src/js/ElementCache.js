import { ElementContainer } from "./ElementContainer.js";
import { ElementRepository } from "./ElementRepository.js";

export class ElementCache extends ElementContainer{

    constructor(x, y, elSize) {
        super(x, y, elSize);
    }

    remove(element) {
        let index = super.remove(element);
        this.moveUpAll(index);
    }

    moveUpAll(removedIndex) {
        for(let i = this.elements.length - 1; i >= removedIndex; i--) {
            this.elements[i].move(-this.elementSize, 0);
        }
    }
}

export class StackedElementCache extends ElementContainer {
    
    constructor(x, y, elSize, stackHeight) {
        super(x, y, elSize);
        this.stackHeight = stackHeight;
        this.order = {
            "FIRE": 0,
            "WATER": 1,
            "EARTH": 2,
            "AIR": 3,
            "DECAY": 4,
            "GROWTH": 5,
        };
        this.count = {
            "FIRE": 0,
            "WATER": 0,
            "EARTH": 0,
            "AIR": 0,
            "DECAY": 0,
            "GROWTH": 0,
        };
    }

    add(element) {
        super.add(element);

        element.x = this.order[element.type] * this.elementSize + this.count[element.type] * this.stackHeight;;
        element.y = this.y + this.count[element.type] * this.stackHeight;

        this.count[element.type]++;
    }

    remove(element) {
        super.remove(element);

        this.count[element.type]--;
    }
}

export class SpellCache extends ElementCache {

    add(element) {
        if(this.fillable) {
            super.add(element);
        }
    }

    get fillable() {
        return this.elements.length < 3;
    }
}
