import { Accidental } from "./types";

export abstract class Note {
    abstract pitch : number; // starts at alto C
    abstract accidental : Accidental; // sharp, flat, natural, none
    abstract staccato : boolean;
}