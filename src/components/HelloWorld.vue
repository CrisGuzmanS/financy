<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';
import { sp500 } from '../helpers/SP500';

const VIX = ref(null)
const SP500 = ref(null)

onMounted(async () => {
	VIX.value = await vix()
	SP500.value = await sp500()
})

</script>

<template>
	<div :class="[VIX?.color?.background, VIX?.color?.text, 'rounded-2xl py-2 px-4 mr-4 inline-block']">
		<h2 :class="['text-xl font-semibold text-gray-800 mb-1']">
			VIX
		</h2>
		<p class="text-gray-500 text-sm">
			{{ VIX?.value || 0 }}
		</p>
	</div>

	<div :class="[SP500?.color?.background, SP500?.color?.text, 'rounded-2xl py-2 px-4 inline-block']">
		<h2 :class="['text-xl font-semibold text-gray-800 mb-1']">
			S&P 500
		</h2>
		<p class="text-gray-500 text-sm">
			{{ SP500?.drawdown || 0 }}
		</p>
	</div>
</template>
