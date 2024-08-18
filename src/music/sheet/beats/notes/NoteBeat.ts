import { Beat } from "../Beat";
import { NoteData } from "../beatData";

export abstract class NoteBeat extends Beat {
    readonly data! : NoteData;
}