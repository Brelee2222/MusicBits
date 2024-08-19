<script lang="ts">
    import { NoteBeat } from "$lib/scripts/music/sheet/beats";

    function letterToPitch(letter : string) {
        return letter.charCodeAt(0)-65;
    }

    export let noteBeat : NoteBeat;
</script>

{#if noteBeat.showStem}
    <line x1=".05" y1=".568" x2=".05" y2="5" stroke="black" stroke-width="0.1"/>
{/if}

{#each noteBeat.data.notes as note}
    <image href="/notes/minmNote.svg" height="1" y="{letterToPitch(note.letter)}"/>
{/each}