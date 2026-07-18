<script setup>
defineProps({
    title: String,
    value: [String, Number],
    color: Object
})
</script>

<template>
    <div :class="[
        color,
        'flex-1 rounded-sm py-2 px-4 border'
    ]">
        <h2 class="text-xl font-semibold mb-1 text-white">
            {{ title }}
        </h2>
        <p class="text-sm text-white">
            {{ value }}
        </p>
    </div>
</template>