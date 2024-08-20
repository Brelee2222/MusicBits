<script lang="ts">
    import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import NoteStem from "./NoteStem.svelte";

    const note = NoteBeat.makeBeat<CrotchetNote>(CrotchetNote, {
        "dotted" : false,
        "notes" : [
            {
                "pitch" : 0,
                "accidental" : "natural",
            },
            {
                "pitch" : 2,
                "accidental" : "natural",
            }
        ],
        "staccato" : false,
        "value" : 0
    });
</script>
<template id="genericNote">
    <image href="/notes/minmNote.svg" height="2.1"/>
</template>
<svg width="500px" height="500px" viewBox="0 0 20 20">

    <pattern id="staffs" width="2" height="2" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.05" x2="1000" y2="0.05" stroke="black" stroke-width="0.1"/>
    </pattern>

    <rect width="10" height="10" fill="url(#staffs)"/>

    <NoteStem noteBeat={note}></NoteStem>
</svg>