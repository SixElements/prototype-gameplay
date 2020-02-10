export default class Element {

    constructor(name, image, modifiers) {
        this.name = name;
        this.image = image;
        this.modifiers = modifiers;
    }

    equals(element) {
        return this.name = element.name;
    }

    hasModifier(modifier) {
        this.modifiers.includes(modifier);
    }
}
