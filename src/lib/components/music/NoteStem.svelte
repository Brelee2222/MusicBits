<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;

    function renderNotes() {
        noteBeat.data.notes.forEach(note => {
            const notesElement = document.getElementById("notes");

            const noteElement = (document.querySelector("#genericNote") as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;

            noteElement.firstElementChild?.setAttribute("y", `${note.pitch}`);

            notesElement?.appendChild(noteElement);
        });
    }

    onMount(renderNotes);
</script>

<g id="stem">
    {#if noteBeat.showStem}
        <!-- line is a bit off -->
        <line x1=".1" y1="1.136" x2=".1" y2="10" stroke="black" stroke-width="0.2"/>
    {/if}
    <g id="notes"></g>
</g>