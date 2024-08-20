<script lang="ts">
    import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import NoteStem from "./NoteStem.svelte";

    const note = NoteBeat.makeBeat<CrotchetNote>(CrotchetNote, {
        "dotted" : false,
        "notes" : [
            {
                "pitch" : 1,
                "accidental" : "natural",
            },
            {
                "pitch" : 0,
                "accidental" : "natural",
            }
        ],
        "staccato" : false,
        "value" : 0
    });
</script>
<template id="genericNote">
    <image href="/notes/genericNote.svg" height="1"/>
</template>
<svg width="500px" height="500px" viewBox="0 0 10 10">

    <pattern id="staffs" width="1" height="1" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="0.1"/>
    </pattern>

    <rect width="4" height="4" fill="url(#staffs)"/>

    <NoteStem noteBeat={note}></NoteStem>
</svg>