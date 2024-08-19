<script lang="ts">
    import type { NoteBeat } from "$lib/scripts/music/sheet/beats";

    export let noteBeat : NoteBeat;
</script>

{#if noteBeat.showStem}
    <line x1="0.05" y1="0.671" x2="0.05" y2="5" stroke="black" stroke-width="0.1"/>
{/if}

<image href="/testNote.svg" height="1"/>