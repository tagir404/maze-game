<script setup lang="ts">
import { playerSize } from '@/settings/settings'

defineProps<{
    playerPosition: number
}>()
</script>

<template>
    <div
        class="player"
        :style="{
            marginLeft: `${playerPosition}px`,
            width: `${playerSize}px`,
            height: `${playerSize}px`
        }"
    ></div>
</template>

<style scoped>
.player {
    background: var(--player-color);
    border-radius: 10px;
}
</style>
