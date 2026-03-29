<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';

const VIX = ref(null)

onMounted(async () => {
	VIX.value = await vix()
})

</script>

<template>
	<div class="bg-white shadow-md rounded-2xl p-6 w-80">
		<h2 class="text-xl font-semibold text-gray-800 mb-2">
			VIX
		</h2>
		<p class="text-gray-500 text-sm mb-4">
			{{ VIX }}
		</p>
	</div>
</template>
