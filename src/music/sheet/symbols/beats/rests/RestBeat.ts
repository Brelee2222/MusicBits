import { Beat } from "../Beat";
import { BeatData } from "../types";

export abstract class RestBeat extends Beat {
    data! : BeatData;
}