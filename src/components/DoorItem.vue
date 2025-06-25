<script setup lang="ts">
import { SETTINGS } from '@/settings/settings'
import { useTemplateRef } from 'vue'

const props = defineProps<{
    isActive: boolean
}>()

const el = useTemplateRef('node')
defineExpose({
    el
})
</script>

<template>
    <div
        ref="node"
        class="door"
        :class="{ door_active: props.isActive }"
        :style="{
            width: `${SETTINGS.doorWidth}px`,
            height: `${SETTINGS.doorHeight}px`
        }"
    ></div>
</template>

<style scoped>
.door {
    background: var(--door-bg-color);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 10px solid transparent;
    border-bottom: none;
    transition: 200ms;
}

.door_active {
    border-color: var(--door-active-border-color);
}
</style>
