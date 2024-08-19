<script lang="ts">
    import Note from "./Note.svelte";

    import { CrotchetNote } from "$lib/scripts/music/sheet/beats/notes/CrotchetNote";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    const note = NoteBeat.makeBeat<CrotchetNote>(CrotchetNote, {
        "dotted" : false,
        "notes" : [
            {
                "letter" : "A",
                "accidental" : "none",
                "octave" : 0
            },
            {
                "letter" : "B",
                "accidental" : "none",
                "octave" : 0
            }
        ],
        "staccato" : false,
        "value" : 0
    });
</script>

<svg width="500px" height="500px" viewBox="0 0 10 10">
    <pattern id="staffs" width="1" height="1" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="black" stroke-width="0.1"/>
    </pattern>

    <rect width="4" height="4" fill="url(#staffs)"/>

    <svg y="1">
        <Note noteBeat={note}></Note>
    </svg>
</svg>