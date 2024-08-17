import { RestBeat } from "./RestBeat";

// Breve rest with -1 breves can be treated as a semi-breve rest.

export class BreveRest extends RestBeat {
    beats = 4 << (this.data.value + 1);
}