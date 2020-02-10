import { Owl, Tentacle, Spider } from "./Enemy.js";

export class Levels {

    static get Level1() {
        return [
            [Owl, Owl, Owl],
            [Tentacle, Tentacle],
            [Spider],
            [Tentacle, Owl],
            [Tentacle, Spider, Tentacle],
        ];
    }
}