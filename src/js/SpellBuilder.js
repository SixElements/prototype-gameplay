import { ElementContainer } from "./ElementContainer.js";
import { ElementRepository } from "./ElementRepository.js";

export class SpellBuilder extends ElementContainer{

    constructor(x, y, elSize) {
        super(x, y, elSize);
    }

    add(element) {
        super.add(element);
        let offsetsX = [-this.elementSize/2, this.elementSize/2, 0],
            offsetsY = [0, 0, this.elementSize * Math.sin(Math.PI/3)];
        element.x = this.x + offsetsX[this.elements.length - 1];
        element.y = this.y + offsetsY[this.elements.length - 1];
        element.svg.setAttributeNS(null, "spell", this.elements.length - 1);
    }

    load(elements) {
        if(this.fillable) {
            elements.forEach(element => this.add(element));
        }
        this.calculateSpellStats();
    }

    get fillable() {
        return this.elements.length === 0;
    }

    calculateSpellStats() {
        this.spell = {};
        this.spell.dmg = 20;
        this.spell.spread = 0;
        this.spell.duration = 0;
        this.spell.debuff = false;
        this.spell.refill = 0;
        this.spell.luck = 0;
        this.spell.dot = false;
        this.spell.splash = false;
        this.spell.heal = false;
        this.spell.execute = 0;
        this.elements.forEach( el => {
            switch(el.type) {
                case ElementRepository.Elements.FIRE:
                    this.spell.luck += 0.3;
                    this.spell.dmg += 10;
                    this.spell.dot = true;
                    break;
                case ElementRepository.Elements.WATER:
                    this.spell.refill += 0.3;
                    this.spell.duration += 1;
                    break;
                case ElementRepository.Elements.EARTH:
                    this.spell.dmg += 15;
                    break;
                case ElementRepository.Elements.AIR:
                    this.spell.splash = true;
                    this.spell.luck += 0.3;
                    this.spell.spread += 1;
                    break;
                case ElementRepository.Elements.DECAY:
                    this.spell.dot = true;
                    this.spell.debuff += true;
                    this.spell.execute += .20;
                    break;
                case ElementRepository.Elements.GROWTH:
                    this.spell.heal = true;
                    this.spell.refill += 0.2;
                    break;
            }            
        });

        if(this.spell.luck > Math.random()) {
            this.spell.dmg *= 1.5;
        }
        this.spell.droppedElements = [];
        let dropRate = Math.floor(this.spell.refill / Math.random());
        for(let i=0; i < dropRate; i++) {
            this.spell.droppedElements.push(ElementRepository.getElementEntity(ElementRepository.randomElement));
        }
        if(this.spell.splash) {
            this.spell.dmg *= 0.6;
        }
        console.log(this.spell.dmg, this.spell.droppedElements);

    }

    cast(target, enemies) {
        let targets = [];
        if(this.spell.splash) {
            targets = [...enemies];
        } else {
            targets.push(target);
        }
        for(let i = targets.length - 1; i >= 0; i--) {
            let t = targets[i];

            t.damage(this.spell.dmg);
            if(this.spell.execute && t.life/t.maxLife  <= this.spell.execute && t.life > 0) {
                console.log("Enemy Executed: life,%,execution%:", t.life, t.life/t.maxLife, this.spell.execute);
                t.damage(t.life);
            }   
        }        
    }
}
