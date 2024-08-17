import { NoteBeat } from "./notes/NoteBeat";
import { Note } from "./notes/types";

export type BeatData = {
    readonly delay : number;
    readonly dotted : number;
    readonly value : number; // Quavers or Breves
}

export type NoteData = BeatData & {
    readonly notes : Note[];
    readonly staccato : boolean;
    readonly tie? : NoteBeat;
}