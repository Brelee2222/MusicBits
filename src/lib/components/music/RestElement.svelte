<script lang="ts">
	import type { RestBeat } from "$lib/scripts/music/sheet/beats";
	import { BEAT_ELEMENT_RIGHT_PADDING } from "./consts";

    export let beat : RestBeat;

    export let width : number = 0;

    export let x : number = 0;

    export let rightPadding : number = BEAT_ELEMENT_RIGHT_PADDING;
</script>

<svelte:options accessors={true}/>

