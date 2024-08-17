import { Beat } from "../Beat";
import { NoteData } from "../types";

export abstract class NoteBeat extends Beat {
    data! : NoteData;

    tie? : NoteBeat;
}