import { Beat } from "../Beat";
import type { BeatData } from "../beatData";

export abstract class RestBeat extends Beat {
    declare readonly data : BeatData;
}