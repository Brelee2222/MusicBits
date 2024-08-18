import { Beat } from "../Beat";
import type { NoteData } from "../beatData";

export abstract class NoteBeat extends Beat {
    declare readonly data : NoteData;
}