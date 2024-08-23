<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";
	import NoteStem from "./NoteStem.svelte";
	import { MinmNote } from "$lib/scripts/music/sheet/beats/notes/MinmNote";

    const note = NoteBeat.makeBeat<MinmNote>(MinmNote, {
        "dotted" : false,
        "notes" : [
            {
                "pitch" : 1,
                "accidental" : "natural",
            },
            {
                "pitch" : 2,
                "accidental" : "natural",
            },
            {
                "pitch" : 4,
                "accidental" : "natural",
            }
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