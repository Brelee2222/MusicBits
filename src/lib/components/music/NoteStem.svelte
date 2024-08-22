<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;

    function renderNotes() {
        let lastPitch = NaN;
        noteBeat.data.notes.forEach(note => {
            const notesElement = document.getElementById("notes");

            const noteElement = (document.querySelector("#genericNote") as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;

            noteElement.firstElementChild?.setAttribute("y", `${11 - note.pitch}`);
            
            if(lastPitch+1 == note.pitch)
                noteElement.firstElementChild?.setAttribute("x", "2.4507775");
            else
                lastPitch = note.pitch;

            notesElement?.appendChild(noteElement);
        });
    }

    onMount(renderNotes);
</script>

<g id="stem">
    {#if noteBeat.showStem}
        <!-- line is a bit off -->
        <line id="stemLine" x1="2.5507775" y1="1.136" x2="2.5507775" y2="10.636" stroke="black" stroke-width="0.2"/>
    {/if}
    <g id="notes"/>
</g>