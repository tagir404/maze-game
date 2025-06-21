<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { SETTINGS } from '@/settings/settings'
import ThePlayer from './ThePlayer.vue'
import type { Level } from '@/types/types'

const props = defineProps<{
    level: Level
}>()

const currentRoomId = ref(1)
const currentRoom = computed(() =>
    props.level.rooms.find(room => room.id === currentRoomId.value)
)

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
        <div class="room">
            <div class="doors">
                <div
                    v-for="door in currentRoom?.doors"
                    :key="door.roomInside"
                    class="door"
                    :style="{ backgroundColor: door.background }"
                ></div>
            </div>
            <ThePlayer
                class="player"
                :playerPosition
            />
        </div>
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

.room {
    position: relative;
}

.doors {
    display: flex;
    justify-content: space-evenly;
}

.door {
    width: 200px;
    height: 300px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.player {
    position: absolute;
    bottom: 0;
}

.floor {
    height: 30%;
    border-top: 30px solid #828282;
    background: #6a6a6a;
}
</style>
