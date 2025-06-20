<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { SETTINGS } from '@/settings/settings'
import ThePlayer from './ThePlayer.vue'
import type { Level } from '@/types/types'

const props = defineProps<{
    level: Level
}>()

const sceneBlock = useTemplateRef('sceneRef')
const sceneWidth = ref()

const playerPosition = ref(0)

const hanlder = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
        if (playerPosition.value + SETTINGS.playerSpeed <= sceneWidth.value)
            playerPosition.value += SETTINGS.playerSpeed
        else playerPosition.value = sceneWidth.value
    }
    if (e.key === 'ArrowLeft') {
        if (playerPosition.value - SETTINGS.playerSpeed >= 0)
            playerPosition.value -= SETTINGS.playerSpeed
        else playerPosition.value = 0
    }
}

onMounted(() => {
    sceneWidth.value = sceneBlock.value!.offsetWidth - SETTINGS.playerSize
    document.addEventListener('keydown', hanlder)
})
onUnmounted(() => {
    document.removeEventListener('keydown', hanlder)
})
</script>

<template>
    <div
        class="scene"
        :style="{ backgroundColor: props.level.background }"
        ref="sceneRef"
    >
        <ThePlayer :playerPosition />
        <div class="floor"></div>
    </div>
</template>

<style scoped>
.scene {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
}
.floor {
    height: 30%;
    border-top: 30px solid #828282;
    background: #6a6a6a;
}
</style>
