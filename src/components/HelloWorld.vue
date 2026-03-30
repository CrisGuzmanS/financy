<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';
import { sp500 } from '../helpers/SP500';
import { dolar } from '../helpers/dolar';
import { holdings } from '../helpers/holdings';

const VIX = ref(null)
const SP500 = ref(null)
const DOLAR = ref(null)
const HOLDINGS = ref(null)

onMounted(async () => {
	VIX.value = await vix()
	SP500.value = await sp500()
	DOLAR.value = await dolar()
	HOLDINGS.value = await holdings()
})

</script>

<template>

	<div class="mb-4">
		<div :class="[VIX?.color?.background, VIX?.color?.text, VIX?.color?.border, 'rounded-2xl py-2 px-4 mr-4 inline-block border']">
			<h2 :class="['text-xl font-semibold mb-1']">
				VIX
			</h2>
			<p class="text-sm">
				{{ VIX?.value || 0 }}
			</p>
		</div>
	
		<div :class="[SP500?.color?.background, SP500?.color?.text, SP500?.color?.border, 'rounded-2xl py-2 px-4 mr-4 inline-block border']">
			<h2 :class="['text-xl font-semibold mb-1']">
				S&P 500
			</h2>
			<p class="text-sm">
				-{{ SP500?.drawdown || 0 }}
			</p>
		</div>
	
		<div :class="['rounded-2xl py-2 px-4 inline-block bg-white mb-4 border border-gray-300 bg-gray-200']">
			<h2 :class="['text-xl font-semibold mb-1']">
				DÓLAR
			</h2>
			<p class="text-sm">
				{{ DOLAR || 0 }} MXN
			</p>
		</div>
	</div>

	<template v-for="holding in HOLDINGS">
		<h1 :class="['text-xl font-semibold']">
			{{ holding.ticker }}
		</h1>
	
		<div :class="['shadow rounded-2xl pt-2 mb-8']">
	
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-0 bg-white">
				
				<div :class="['p-2 border-r']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Costo actual
					</h2>
					<p class="text-sm">
						
					</p>
				</div>

				<div :class="['p-2 bg-red-200 text-red-600']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Caida actual
					</h2>
					<p class="text-sm">
						-14.50%
					</p>
				</div>

				<div :class="['p-2 border-r']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Número de acciones
					</h2>
					<p class="text-sm">
						{{ holding.quantity || 0 }}
					</p>
				</div>
				<div :class="['p-2 border-r']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Costo promedio
					</h2>
					<p class="text-sm">
						{{ holding.cost?.average || 0 }}
					</p>
				</div>
				<div :class="['p-2 border-r']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Costo total
					</h2>
					<p class="text-sm">
						{{ holding.cost?.total || 0 }}
					</p>
				</div>
				<div :class="['p-2 border-r']">
					<h2 :class="['text-lg font-semibold mb-1']">
						VIX promedio
					</h2>
					<p class="text-sm">
						{{ holding?.vix || 'N/A' }}
					</p>
				</div>
				<div :class="['p-2']">
					<h2 :class="['text-lg font-semibold mb-1']">
						S&P 500 promedio
					</h2>
					<p class="text-sm">
						6,368.85
					</p>
				</div>
				<div :class="['p-2 bg-red-200 text-red-600']">
					<h2 :class="['text-lg font-semibold mb-1']">
						Ganancia/Perdida
					</h2>
					<p class="text-sm">
						{{ holding?.profit || 0 }}
					</p>
				</div>
			</div>
	
		</div>
	</template>


</template>
