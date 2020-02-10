import { Element } from "./Entity.js";
import AssetProvider from "./AssetProvider.js";

export class ElementRepository {
    static get Elements() {
        return {
            FIRE:   "FIRE", 
            WATER:  "WATER", 
            EARTH:  "EARTH", 
            AIR:    "AIR", 
            GROWTH: "GROWTH", 
            DECAY:  "DECAY",
        };
    }

    static get randomElement() {
        return Object.values(ElementRepository.Elements)[
            Math.floor(Math.random() * Object.values(ElementRepository.Elements).length)];
    }
    static getElementEntity(type) {
        if(Object.values(ElementRepository.Elements).includes(type)) {

            return new Element(0, 0, 50, 50, AssetProvider.images[type], type);
        }
        return false;
    }
}
