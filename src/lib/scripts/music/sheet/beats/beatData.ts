import { NoteBeat } from "./notes/NoteBeat";
import type { Note } from "./notes/types";

export type BeatData = {
    readonly dotted : boolean;
    readonly value : number; // Quavers or Breves
}

export type NoteData = BeatData & {
    readonly notes : Note[];
    readonly staccato : boolean;
    readonly tie? : NoteBeat;
}