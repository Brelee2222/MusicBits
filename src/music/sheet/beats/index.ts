import { Beat } from "./Beat";
import { NoteData } from "./types";

export function makeBeat<T extends Beat>(BeatType : T, data : NoteData) : T {
    return new (BeatType as any)(data) as T;
}