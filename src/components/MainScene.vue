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
import { doorWidth, playerSize, playerSpeed } from '@/settings/settings'
import ThePlayer from './ThePlayer.vue'
import type { Level } from '@/types/types'
import DoorItem from './DoorItem.vue'

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
            >(door => [door!.el!.offsetLeft, door!.el!.offsetLeft + doorWidth])
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

const keys = {
    left: false,
    right: false
}

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') keys.left = true
    if (e.code === 'ArrowRight') keys.right = true
    if (e.code === 'Space' && activeDoor.value !== -1) {
        currentRoomId.value =
            currentRoom.value.doors[activeDoor.value].roomInside
        playerPosition.value = 0
    }
}

const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') keys.left = false
    if (e.code === 'ArrowRight') keys.right = false
}

function gameLoop() {
    if (keys.left) {
        const targetPosition = (playerPosition.value -= playerSpeed)
        if (targetPosition > 0) playerPosition.value = targetPosition
        else playerPosition.value = 0
    }
    if (keys.right) {
        const targetPosition = (playerPosition.value += playerSpeed)
        if (targetPosition < sceneWidth.value)
            playerPosition.value = targetPosition
        else playerPosition.value = sceneWidth.value
    }

    requestAnimationFrame(gameLoop)
}

onMounted(() => {
    sceneWidth.value = sceneBlock.value!.offsetWidth - playerSize

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    requestAnimationFrame(gameLoop)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('keyup', handleKeyUp)
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
                <DoorItem
                    v-for="(door, index) in currentRoom.doors"
                    :key="door.roomInside"
                    :isActive="index === activeDoor"
                    ref="door"
                />
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

.player {
    position: absolute;
    bottom: 0;
}

.floor {
    height: 30%;
    border-top: 30px solid var(--floor-border-color);
    background: var(--floor-bg-color);
}
</style>
