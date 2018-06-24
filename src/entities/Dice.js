import MersenneTwister from "../libraries/MersenneTwister";

export default class Dice {
    constructor(seed) {
        seed = seed || +new Date();

        this.mersenneTwister = new MersenneTwister(seed);
    }

    throwDice(faces, times) {
        if (times === 1) {
            return this.doThrow(faces);
        } else {
            let results = [];

            for (let i = 0; i < times; i++) {
                results.push(this.doThrow(faces));
            }

            return results;
        }
    }

    doThrow(faces) {
        return Math.floor(this.mersenneTwister.random() * faces) + 1;
    }
}