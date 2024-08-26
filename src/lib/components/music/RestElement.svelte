<script lang="ts">
	import type { RestBeat } from "$lib/scripts/music/sheet/beats";
	import { BEAT_ELEMENT_RIGHT_PADDING, CLEFF_MIN_HEIGHT } from "./consts";

    export let beat : RestBeat;

    export const width : number = beat.getWidth();

    export let x : number = 0;

    export let rightPadding : number = BEAT_ELEMENT_RIGHT_PADDING;
</script>

<svelte:options accessors={true}/>

<image id={beat.beatID} x="{x}" y="{(CLEFF_MIN_HEIGHT + beat.getHeight()) / -2}" width="{beat.getWidth()}" height="{beat.getHeight()}" href="{beat.getSVGPath()}"/>