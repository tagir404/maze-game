<script setup lang="ts">
import { SETTINGS } from '@/settings/settings'

defineProps<{
    playerPosition: number
}>()
</script>

<template>
    <div
        class="player"
        :style="{
            marginLeft: `${playerPosition}px`,
            width: `${SETTINGS.playerSize}px`,
            height: `${SETTINGS.playerSize}px`
        }"
    ></div>
</template>

<style scoped>
.player {
    background: var(--player-color);
    border-radius: 10px;
}
</style>
