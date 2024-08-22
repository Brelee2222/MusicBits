<script lang="ts">
    import { onMount } from "svelte";
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;

    export let stemId : `stem${number}`;

    function renderNotes() {
        const noteSVGPath = noteBeat.getSVGPath();
        const noteWidth = noteBeat.getWidth();

        let lastPitch = NaN;
        const notesElement = document.querySelector(`#${stemId} #notes`);
        noteBeat.data.notes.forEach(note => {
            const noteDocumentFragment = (document.querySelector("#genericNoteSVG") as HTMLTemplateElement).content.cloneNode(true) as DocumentFragment;
            const noteElement = noteDocumentFragment.firstElementChild as unknown as SVGImageElement;

            noteElement.setAttribute("href", noteSVGPath);

            // bottom staff - pitch * 10
            noteElement.setAttribute("y", `${100 - note.pitch * 10}`);
            
            if(lastPitch + 1 == note.pitch)
                noteElement.setAttribute("x", `${noteWidth - 2}`);
            else
                lastPitch = note.pitch;

            notesElement?.appendChild(noteDocumentFragment);
        });

        if(noteBeat.showStem) {
            const stemLine = document.querySelector(`#${stemId} #stemLine`) as unknown as SVGLineElement;

            stemLine.setAttribute("y1", "0");

            if(noteBeat.data.notes.length > 1)
                stemLine.setAttribute("y2", `${108.64 - noteBeat.data.notes[0].pitch * 10}`);
            else
                stemLine.setAttribute("y2", `${111.36 - noteBeat.data.notes[0].pitch * 10}`);
        }
    }

    onMount(renderNotes);
</script>

<g id={stemId}>
    {#if noteBeat.showStem}
        <line id="stemLine" x1="25.458" y1="0" x2="25.458" y2="0" stroke="black" stroke-width="2"/>
    {/if}
    <g id="notes"/>
</g>