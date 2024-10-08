import { RestBeat } from "./RestBeat";

// Breve rest with 0 breves can be treated as a semi-breve rest.

export class BreveRest extends RestBeat {
    readonly beats = 4 << this.data.value;
}