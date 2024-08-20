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
        <line x1=".05" y1=".568" x2=".05" y2="5" stroke="black" stroke-width="0.1"/>
    {/if}
    <g id="notes"></g>
</g>