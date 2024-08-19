<script lang="ts">
    import type { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;
</script>

{#if noteBeat.showStem}
    <!-- <line x1=".05" y1=".568" x2=".05" y2="5" stroke="black" stroke-width="0.1"/> -->
{/if}

<image href="/notes/minmNote.svg" height="1"/>