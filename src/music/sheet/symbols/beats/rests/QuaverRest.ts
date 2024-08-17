import { RestBeat } from "./RestBeat";

// Quaver rest with 0 quavers can be treated as a crotchet rest.

export class QuaverRest extends RestBeat {
    beats = 1 / (1 << this.data.value);
}