import { randomInt } from "crypto";
import * as beat from "./beats";

const MAX_BEAT_ID : number = 65025;

const beats = [];

function generateBeatID() : beat.BeatID {
    return `beat-${Math.floor(Math.random() * MAX_BEAT_ID).toString(16)}`
}

console.log(generateBeatID());