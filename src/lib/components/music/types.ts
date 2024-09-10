// @ts-ignore
import NoteStem from "./NoteStemElement.svelte";
// @ts-ignore
import RestElement from "./RestElement.svelte";

export type SymbolData = {
    x : number,
    width : number,
    rightMargin : number
}

export type BeatElement = NoteStem | RestElement;