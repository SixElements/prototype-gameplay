export class SpellCombiner {

    static combine(el1, el2) {
        return el1 < el2 
        ? SpellCombiner._Effect[el1+el2] 
        : SpellCombiner._Effect[el2+el1];
    }

    static _Effect() {
        return {
            "AIRFIRE": 1,
            "AIRWATER": 1,
            "AIREARTH": 1,
            "AIRAIR": 1,
            "AIRGROWTH": 1,
            "AIRDECAY": 1,
            "DECAYFIRE": 1,
            "DECAYWATER": 1,
            "DECAYEARTH": 1,
            "DECAYGROWTH": 1,
            "DECAYDECAY": 1,
            "EARTHFIRE": 1,
            "EARTHWATER": 1,
            "EARTHEARTH": 1,
            "EARTHGROWTH": 1,
            "FIREFIRE": 1,
            "FIREWATER": 1,
            "FIREGROWTH": 1,
            "GROWTHGROWTH": 1,
            "GROWTHWATER": 1,
            "WATERWATER": 1,
        }
    }
}