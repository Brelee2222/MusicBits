import { BreveNote } from "./notes/BreveNote";
import { SemiBreveNote } from "./notes/SemiBreveNote";
import { MinmNote } from "./notes/MinmNote";
import { CrotchetNote } from "./notes/CrotchetNote";
import { QuaverNote } from "./notes/QuaverNote";
import { NoteBeat } from "./notes/NoteBeat";

import { BreveRest } from "./rests/BreveRest";
import { SemiBreveRest } from "./rests/SemiBreveRest";
import { MinmRest } from "./rests/MinmRest";
import { CrotchetRest } from "./rests/CrotchetRest";
import { QuaverRest } from "./rests/QuaverRest";
import { RestBeat } from "./rests/RestBeat";

export * from "./beatData";
export * from "./notes/types";

export * from "./Beat";
export * from "./notes/NoteBeat";
export * from "./rests/RestBeat";

export * from "./types";

export const noteTypes = { 
    BreveNote,
    SemiBreveNote,
    MinmNote,
    CrotchetNote,
    QuaverNote
} satisfies {[index: string] : typeof NoteBeat};

export const restTypes = {
    BreveRest,
    SemiBreveRest,
    MinmRest,
    CrotchetRest,
    QuaverRest
} satisfies {[index: string] : typeof RestBeat};

export const NoteLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G"
];