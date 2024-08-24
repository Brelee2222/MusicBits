<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import NoteStem from "./NoteStem.svelte";
	import { BreveNote } from "$lib/scripts/music/sheet/beats/notes/BreveNote";

    const note = NoteBeat.makeBeat<BreveNote>(BreveNote, {
        "dotted" : false,
        "notes" : [
            {
                "pitch" : -10,
                "accidental" : "natural",
            },
            {
                "pitch" : -9,
                "accidental" : "natural",
            },
            // {
            //     "pitch" : 2,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 4,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 5,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 7,
            //     "accidental" : "natural",
            // },
            // {
            //     "pitch" : 11,
            //     "accidental" : "natural",
            // }
        ],
        "staccato" : false,
        "value" : 0
    });
</script>
<svg width="400px" height="400px" viewBox="-200 -200 400 400">

    <pattern id="staffs" y="10" width="20" height="20" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="1"/>
    </pattern>

    <rect y="-100" width="100" height="100" fill="url(#staffs)"/>

    <NoteStem stemId="stem1" noteBeat={note}></NoteStem>
</svg>