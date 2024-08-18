import { BreveNote } from "./notes/BreveNote";
import { SemiBreveNote } from "./notes/SemiBreveNote";
import { MinmNote } from "./notes/MinmNote";
import { CrotchetNote } from "./notes/CrotchetNote";
import { QuaverNote } from "./notes/QuaverNote";
import { RestBeat } from "./rests/RestBeat";

import { BreveRest } from "./rests/BreveRest";
import { SemiBreveRest } from "./rests/SemiBreveRest";
import { MinmRest } from "./rests/MinmRest";
import { CrotchetRest } from "./rests/CrotchetRest";
import { QuaverRest } from "./rests/QuaverRest";
import { NoteBeat } from "./notes/NoteBeat";

export * as types from "./beatData";

export { Beat } from "./Beat";
export { NoteBeat };
export { RestBeat };

export * as note from "./notes/types";

export const noteTypes : { [index : string] : typeof NoteBeat } = { 
    BreveNote,
    SemiBreveNote,
    MinmNote,
    CrotchetNote,
    QuaverNote
};

export const restTypes : { [index : string] : typeof RestBeat } = {
    BreveRest,
    SemiBreveRest,
    MinmRest,
    CrotchetRest,
    QuaverRest
};