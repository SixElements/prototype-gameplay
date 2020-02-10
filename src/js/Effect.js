class Effect {

    constructor(duration) {

    }

    tick() {
        return true;
    }
}

class EffectWithDuration {

    constructor(duration) {
        this.duration = duration;
    }

    tick() {
        this.duration--;
        return this.duration >= 0;
    }
}

class EffectStore {

    constructor() {
        this.effects = [];
    }

    tick() {
        this.effects = this.effects.filter(e => e.tick());
    }

}

const fireEffect = (target, self) => {
    if(target == self) {

    }
};