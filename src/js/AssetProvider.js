export default class AssetProvider {

    static get images() {
        let src = "./src/images/";
        return {
            "AIR":      src + "Air.png",
            "WATER":    src + "Water.png",
            "FIRE":     src + "Fire.png",
            "EARTH":    src + "Earth.png",
            "GROWTH":   src + "Growth.png",
            "DECAY":    src + "Decay.png",
        }
    }
}