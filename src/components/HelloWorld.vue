<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { vix } from '../helpers/vix';
import { sp500 } from '../helpers/SP500';
import { dolar } from '../helpers/dolar';
import { holdings } from '../holdings/holdings';
import { stock } from '../stocks/stock';
import { StockCollection } from '../stocks/Collections/StockCollection';


import Value from '../utils/Value.vue';
import Holding from '../holdings/Holding.vue'

const VIX = ref(null)
const SP500 = ref(null)
const DOLAR = ref(null)
const HOLDINGS = ref(null)
const STOCKS = ref(null)

const dialog = ref(false)
const toEdit = ref(null)

let interval

onMounted(async () => {
	VIX.value = await vix()
	SP500.value = await sp500()
	DOLAR.value = await dolar()
	HOLDINGS.value = await holdings()

	STOCKS.value = new StockCollection([])
	for (const holding of HOLDINGS.value) {
		STOCKS.value.push(await stock(holding.ticker))
	}

	interval = setInterval(async () => {
		VIX.value = await vix()
		SP500.value = await sp500()
		DOLAR.value = await dolar()
		HOLDINGS.value = await holdings()
	}, 10000)
})

onUnmounted(() => {
	clearInterval(interval)
})

function closeModal() {
	dialog.value = false
}

</script>

<template>

	<v-dialog v-model="dialog">
		<v-card>
			<v-card-title>
				SOXL
			</v-card-title>

			<v-card-text>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						Acciones
					</h2>
					<input type="number" placeholder="Acciones" v-model="toEdit.quantity"
						class="border border-gray-300 rounded px-2 py-1" />
				</div>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						Costo promedio
					</h2>
					<input type="number" placeholder="Costo promedio" v-model="toEdit.cost.average"
						class="border border-gray-300 rounded px-2 py-1" />
				</div>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						Costo total
					</h2>
					<input type="number" placeholder="Costo total" v-model="toEdit.cost.total"
						class="border border-gray-300 rounded px-2 py-1" />
				</div>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						¿Promediar VIX?
					</h2>
				</div>
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn color="red" variant="text" @click="closeModal">
					Cerrar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<div class="mb-4 flex gap-4">
		<Value title="VIX" :value="VIX?.value" :color="VIX?.color?.background" />
		<Value title="S&P 500" :value="SP500?.drawdown" :color="SP500?.color?.background" />
		<Value title="DÓLAR" :value="DOLAR" :color="'bg-indigo-600'" />
	</div>

	<template v-for="holding in HOLDINGS" :key="holding.ticker">
		<Holding :holding="holding" :stock="STOCKS.where('ticker', holding.ticker).first()" :dolar="DOLAR" />
	</template>


</template>
