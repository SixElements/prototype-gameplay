import { CompositeEntity } from "./Entity.js";
import NanoEvents from "./NanoEvents.js";

export class Unit extends CompositeEntity {

    constructor(x, y, width, height, life, imgPath) {
        let sprite = document.createElementNS("http://www.w3.org/2000/svg", "image");
        sprite.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", imgPath);
        sprite.setAttributeNS(null, "x", 0);
        sprite.setAttributeNS(null, "y", height/10);
        sprite.setAttributeNS(null, "width", width);
        sprite.setAttributeNS(null, "height", height);

        let hpBarBackground = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        hpBarBackground.setAttributeNS(null, "x", 0);
        hpBarBackground.setAttributeNS(null, "y", 0);
        hpBarBackground.setAttributeNS(null, "width", width);
        hpBarBackground.setAttributeNS(null, "height", height/10);
        hpBarBackground.setAttributeNS(null, "class", "hp-background");

        let hpBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        hpBar.setAttributeNS(null, "x", 0);
        hpBar.setAttributeNS(null, "y", 0);
        hpBar.setAttributeNS(null, "width", width);
        hpBar.setAttributeNS(null, "height", height/10);
        hpBar.setAttributeNS(null, "class", "hp");

        super(x, y, [hpBarBackground, hpBar, sprite]);
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.hpBar = hpBar;
        this.maxLife = life;
        this.life = life;

        sprite.addEventListener("webkitAnimationEnd", e => {
            sprite.setAttributeNS(null, "class", "");
        }, false);

        this.emitter = new NanoEvents(); 
        this.events = {
            Death: "death"
        };
    }

    on(event, cb) {
        this.emitter.on(event, cb);
    }

    set life(life) {
        this._life = life;
        this.hpBar.setAttributeNS(null, "width", this.width * (life/this.maxLife));
    }

    get life() {
        return this._life;
    }

    damage(dmg) { 
        this.sprite.setAttributeNS(null, "class", "damage");
        if(this.life - dmg <= 0) {
            this.die();
            return;
        }
        this.life = this.life - dmg;  
    }

    die() {
        this.life = 0;
        this.emitter.emit(this.events.Death);
    }
}
