<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import NoteStem from "./NoteStem.svelte";
	import { MinmNote } from "$lib/scripts/music/sheet/beats/notes/MinmNote";
	import { GENERIC_NOTE_WIDTH } from "$lib/scripts/music/sheet/beats/notes/consts";

    const note = NoteBeat.makeBeat<MinmNote>(MinmNote, {
        "dotted" : false,
        "notes" : [
            // {
            //     "pitch" : 0,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 1,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 2,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 3,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 4,
            //     "accidental" : "natural",
            // },
            {
                "pitch" : 6,
                "accidental" : "natural",
            }
        ],
        "staccato" : false,
        "value" : 0
    });
</script>
<template id="genericNoteSVG">
    <image href="/notes/minmNote.svg" width={GENERIC_NOTE_WIDTH}/>
</template>
<svg width="250px" height="250px" viewBox="0 0 200 200">

    <pattern id="staffs" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect width="100" height="100" fill="url(#staffs)"/>

    <NoteStem stemId="stem1" noteBeat={note}></NoteStem>
</svg>