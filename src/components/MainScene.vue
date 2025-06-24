<script setup lang="ts">
import {
    computed,
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    useTemplateRef,
    watch
} from 'vue'
import { SETTINGS } from '@/settings/settings'
import ThePlayer from './ThePlayer.vue'
import type { Level } from '@/types/types'

const props = defineProps<{
    level: Level
}>()

const currentRoomId = ref(1)
const currentRoom = computed(
    () => props.level.rooms.find(room => room.id === currentRoomId.value)!
)

watch(
    currentRoom,
    async () => {
        await nextTick()
        doorsCoordinates.value = doorElems
            .value!.map<
                [number, number]
            >(door => [door.offsetLeft, door.offsetLeft + SETTINGS.doorWidth])
            .sort((a, b) => a[0] - b[0])
    },
    { immediate: true }
)

const doorElems = useTemplateRef('door')
const doorsCoordinates = ref<[number, number][]>([])

const activeDoor = computed(() =>
    doorsCoordinates.value.findIndex(
        door => door[0] < playerPosition.value && door[1] > playerPosition.value
    )
)

const sceneBlock = useTemplateRef('sceneRef')
const sceneWidth = ref()
const playerPosition = ref(0)

const hanlder = (e: KeyboardEvent) => {
    if (e.code === 'ArrowRight') {
        if (playerPosition.value + SETTINGS.playerSpeed <= sceneWidth.value)
            playerPosition.value += SETTINGS.playerSpeed
        else playerPosition.value = sceneWidth.value
    }
    if (e.code === 'ArrowLeft') {
        if (playerPosition.value - SETTINGS.playerSpeed >= 0)
            playerPosition.value -= SETTINGS.playerSpeed
        else playerPosition.value = 0
    }
    if (e.code === 'Space' && activeDoor.value !== -1) {
        currentRoomId.value =
            currentRoom.value.doors[activeDoor.value].roomInside
        playerPosition.value = 0
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
        ref="sceneRef"
    >
        <div class="room">
            <p class="level-info">Level 1</p>
            <div class="doors">
                <div
                    v-for="(door, index) in currentRoom.doors"
                    :key="door.roomInside"
                    class="door"
                    :class="{ door_active: index === activeDoor }"
                    ref="door"
                    :style="{
                        width: `${SETTINGS.doorWidth}px`,
                        height: `${SETTINGS.doorHeight}px`
                    }"
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.level-info {
    font-size: 24px;
    padding: 20px;
}

.doors {
    display: flex;
    justify-content: space-evenly;
}

.door {
    background: rgb(181, 181, 181);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    transition: 200ms;
}

.door_active {
    /* transform: rotate3d(0, -1, 0, 30deg); */
    box-shadow: 0 0 50px inset #878787;
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
