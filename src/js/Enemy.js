import { Unit } from "./unit.js";
import { ElementRepository } from "./ElementRepository.js";

export class Enemy extends Unit {

    constructor(x, y, width, height, life, imgPath, lootTable) {
        super(x, y, width, height, life, imgPath);
        this.lootTable = lootTable;
        this.playerLuck = 0;
        this.events.LOOT = "loot";
    }

    loot(chance) {
        let loot = [];
        for(let index in this.lootTable) {
            if(index <= chance) {
                loot = loot.concat(this.lootTable[index]);
            }
        }
        return loot;
    }

    attack(target) {
        target.damage(0);
    }

}

export class Owl extends Enemy {

    constructor(x, y) {
        let width = 100,
            height = 100,
            life = 100,
            imgPath = "./src/images/Owl.png",
            lootTable = {
                0: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                ],
                0.2: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                    ElementRepository.getElementEntity(ElementRepository.Elements.WATER),
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                ],
                0.4: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                ],
                0.9: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                    ElementRepository.getElementEntity(ElementRepository.Elements.WATER),
                    ElementRepository.getElementEntity(ElementRepository.Elements.AIR),
                ],
            };
        super(x, y + 100, width, height, life, imgPath, lootTable);
    }
}

export class Tentacle extends Enemy {

    constructor(x, y) {
        let width = 100,
            height = 100,
            life = 70,
            imgPath = "./src/images/Tentacle.png",
            lootTable = {
                0: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                    ElementRepository.getElementEntity(ElementRepository.Elements.WATER),
                ],
                0.2: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                    ElementRepository.getElementEntity(ElementRepository.Elements.WATER),
                    ElementRepository.getElementEntity(ElementRepository.Elements.EARTH),
                ],
                0.4: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.WATER),
                ],
                0.9: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                    ElementRepository.getElementEntity(ElementRepository.Elements.EARTH),
                ],
            };
        super(x, y + 100, width, height, life, imgPath, lootTable);
    }
}

export class Spider extends Enemy {

    constructor(x, y) {
        let width = 200,
            height = 200,
            life = 300,
            imgPath = "./src/images/Spider.png",
            lootTable = {
                0: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.FIRE),
                    ElementRepository.getElementEntity(ElementRepository.Elements.GROWTH),
                ],
                0.2: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.FIRE),
                    ElementRepository.getElementEntity(ElementRepository.Elements.FIRE),
                    ElementRepository.getElementEntity(ElementRepository.Elements.EARTH),
                ],
                0.4: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.DECAY),
                ],
                0.9: [
                    ElementRepository.getElementEntity(ElementRepository.Elements.FIRE),
                    ElementRepository.getElementEntity(ElementRepository.Elements.FIRE),
                    ElementRepository.getElementEntity(ElementRepository.Elements.GROWTH),
                ],
            };
        super(x, y, width, height, life, imgPath, lootTable);
    }
}