<script setup lang="ts">
import MainScene from '@/components/MainScene.vue'
import type { Level } from '@/types/types'
import { reactive } from 'vue'

const level: Level = reactive({
    background: '#caf0f8',
    rooms: [
        {
            id: 1,
            background: '#ade8f4',
            doors: [
                {
                    background: '#fdf0d5',
                    roomInside: 2
                },
                {
                    background: '#ffc8dd',
                    roomInside: 3
                }
            ]
        },
        {
            id: 2,
            background: '#ebf2fa',
            doors: [
                {
                    background: '#427aa1',
                    roomInside: 1
                },
                {
                    background: '#7fc8f8',
                    roomInside: 3
                }
            ]
        },
        {
            id: 3,
            background: '#cce6f4',
            doors: [
                {
                    background: '#4f6d7a',
                    roomInside: 1
                },
                {
                    background: '#d8315b',
                    roomInside: 2
                },
                {
                    background: '#ab3428',
                    roomInside: 3
                }
            ]
        }
    ]
})
</script>

<template>
    <main>
        <MainScene :level />
    </main>
</template>

<style scoped>
main {
    width: 100%;
    height: 100vh;
}
</style>
