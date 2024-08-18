import { Beat } from "../Beat";
import { BeatData } from "../beatData";

export abstract class RestBeat extends Beat {
    readonly data! : BeatData;
}