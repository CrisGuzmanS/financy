<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';

const VIX = ref(null)

onMounted(async () => {
	VIX.value = await vix()
})

</script>

<template>
	<div :class="[VIX?.color?.background, VIX?.color?.text, 'rounded-2xl py-2 px-4 inline-block']">
		<h2 :class="['text-xl font-semibold text-gray-800 mb-1']">
			VIX
		</h2>
		<p class="text-gray-500 text-sm">
			{{ VIX?.value || 0 }}
		</p>
	</div>
</template>
