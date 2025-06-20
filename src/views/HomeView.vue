<script setup lang="ts">
import MainScene from '@/components/MainScene.vue'
import type { Level } from '@/types/types'
import { reactive } from 'vue'

const level: Level = reactive({
    background: '#caf0f8',
    rooms: [
        {
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
