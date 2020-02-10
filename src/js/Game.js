import { SpellCache, StackedElementCache } from "./ElementCache.js";
import { SpellBuilder } from "./SpellBuilder.js";
import { ElementRepository } from "./ElementRepository.js";
import { Levels } from "./Levels.js";

class Game {

    constructor() {
        this.svg = document.querySelector("svg");
        this.entities = [];
        this.loadedSpell = [];
        this.enemies = [];
        this.loot = [];
        this.elementStore = new StackedElementCache(0, 0, 50, 5);
        this.spellView = new SpellCache(0, 400, 100);
        this.spellBuilder = new SpellBuilder(100, 200, 80);
        this.level = Levels.Level1;
        this.levelProgress = 0;
    }

    start() { 
        this.getStartingElements();
        this.getEnemies();

        this.elementStore.on(this.elementStore.events.Click, el => {
            this.loadElementIntoCache(el);

        })

        this.spellView.on(this.spellView.events.Click, el => {
            this.removeElementFromCache(el);
        })

        this.spellView.on(this.spellView.events.ElementAdded, () => { 
            this.loadElementsIntoSpell();
        })
    }

    loadElementsIntoSpell() {
        if(!this.spellView.fillable && this.spellBuilder.fillable) {
            this.spellBuilder.load(this.spellView.elements);
            this.spellView.empty();
        }
    }

    removeElementFromCache(el) {
        this.conditionalMove(
            this.spellView,
            this.elementStore,
            el,
            true
        ); 
    }

    loadElementIntoCache(el) {
        this.conditionalMove(
            this.elementStore,
            this.spellView,
            el,
            this.spellView.fillable
        ); 
    }

    conditionalMove(a, b, element, condition) {
        if(condition) {
            b.add(element);
            a.remove(element);
        }
    }

    getStartingElements() {
        Object.values(ElementRepository.Elements).forEach(el => {
            for(let i = 0; i < 3; i++) {
                this.elementStore.add(ElementRepository.getElementEntity(el));
            }
        });
        this.elementStore.elements.forEach(e => {
            this.svg.appendChild(e.svg);
        });
    }

    getEnemies() {
        this.level[this.levelProgress].forEach((enemyClass, i) => {
            this.getEnemy(enemyClass, i);
        });
    }

    getEnemy(enemyClass, pos) {
        let enemy = new enemyClass(600 - (pos - 1) * 200, 100);
        this.enemies[pos] = enemy;
        
        enemy.addListener("click", () => {
            this.attack(enemy);
        });
        enemy.on(enemy.events.Death, this.onEnemyDeath.bind(this, enemy));

        this.svg.appendChild(enemy.svg);
    }

    onEnemyDeath(enemy) {
        this.spawnLoot(enemy.loot(.5));
        console.log(this.svg, enemy.svg, this.svg.h);
        this.svg.removeChild(enemy.svg);
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
        if(this.enemies.length === 0) {
            this.levelProgress++;
            if(this.levelProgress >= this.level.length) {
                return;
            }
            this.getEnemies();
        }
    }

    spawnLoot(loot) {
        loot.forEach(item => {
            item.x = 300 + Math.random() * 500;
            item.y = 400 + Math.random() * 50;
            item.addListener("click", e => {
                this.pickUpLoot();
            });
            this.svg.appendChild(item.svg);
        })
        
        this.loot = this.loot.concat(loot);
        console.log("LOOT:",loot, this.loot);
    }

    pickUpLoot() {
        console.log("pick up loot", this.loot);
        this.loot.forEach(item => this.elementStore.add(item));
        this.loot = [];
    }

    attack(enemy) {
        console.log(this.spellBuilder.elements.length);
        if (this.spellBuilder.elements.length > 0) {
            this.spellBuilder.cast(enemy, this.enemies);
            this.spellBuilder.elements.forEach(el => this.svg.removeChild(el.svg));
            this.spellBuilder.empty();
            this.loadElementsIntoSpell();
        }
    }
}

let game = new Game();
game.start();