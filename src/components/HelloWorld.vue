<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';

const VIX = ref(null)

onMounted(async () => {
	VIX.value = await vix()
})

</script>

<template>

	<div>
		{{ VIX }}
	</div>
</template>
