<script setup>
import { onMounted, ref } from 'vue'
import { vix } from '../helpers/vix';
import { sp500 } from '../helpers/SP500';
import { dolar } from '../helpers/dolar';
import { holdings } from '../holdings/holdings';
import { stock } from '../stocks/stock';
import { StockCollection } from '../stocks/Collections/StockCollection';
import { unformat } from '../helpers/unformat.js';
import { Format } from '../helpers/Format.js';

const VIX = ref(null)
const SP500 = ref(null)
const DOLAR = ref(null)
const HOLDINGS = ref(null)
const STOCKS = ref(null)

const dialog = ref(false)
const toEdit = ref(null)

onMounted(async () => {
	VIX.value = await vix()
	SP500.value = await sp500()
	DOLAR.value = await dolar()
	HOLDINGS.value = await holdings()

	STOCKS.value = new StockCollection([])
	for (const holding of HOLDINGS.value) {
		STOCKS.value.push(await stock(holding.ticker))
	}

})

function openModal(holding) {
	toEdit.value = holding
	dialog.value = true
}

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
					<input type="number" placeholder="Acciones" v-model="toEdit.quantity" class="border border-gray-300 rounded px-2 py-1" />
				</div>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						Costo promedio
					</h2>
					<input type="number" placeholder="Costo promedio" v-model="toEdit.cost.average" class="border border-gray-300 rounded px-2 py-1" />
				</div>
				<div class="mb-4">
					<h2 :class="['text-xl font-semibold mb-1']">
						Costo total
					</h2>
					<input type="number" placeholder="Costo total" v-model="toEdit.cost.total" class="border border-gray-300 rounded px-2 py-1" />
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

	<div class="mb-4">
		<div
			:class="[VIX?.color?.background, VIX?.color?.text, VIX?.color?.border, 'rounded-2xl py-2 px-4 mr-4 inline-block border']">
			<h2 :class="['text-xl font-semibold mb-1']">
				VIX
			</h2>
			<p class="text-sm">
				{{ VIX?.value || 0 }}
			</p>
		</div>

		<div
			:class="[SP500?.color?.background, SP500?.color?.text, SP500?.color?.border, 'rounded-2xl py-2 px-4 mr-4 inline-block border']">
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

	<template v-for="holding in HOLDINGS" :key="holding.ticker">

		<div class="mb-8">
			<h1 :class="['text-xl font-semibold']">
				{{ holding.ticker }}
			</h1>
	
			<div :class="['shadow rounded-2xl pt-2 mb-2']">
	
				<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-9 gap-0 bg-white">
	
					<div :class="['p-2 border-r']">
						<h2 :class="['text-lg font-semibold mb-1']">
							Costo actual
						</h2>
						<p class="text-sm">
							{{ Format.money(unformat(STOCKS.where('ticker', holding.ticker).first()?.price ||
								0) * unformat(DOLAR)) }}
						</p>
					</div>
	
					<div :class="['p-2 bg-green-200 text-green-600']">
						<h2 :class="['text-lg font-semibold mb-1']">
							Caida actual
						</h2>
						<p class="text-sm">
							-{{ STOCKS.where('ticker', holding.ticker).first()?.drawdown || 0 }}
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
							{{ Format.money(holding.cost?.average || 0) }}
						</p>
					</div>
					<div :class="['p-2 border-r']">
						<h2 :class="['text-lg font-semibold mb-1']">
							Costo total
						</h2>
						<p class="text-sm">
							{{ Format.money(holding.cost?.total || 0) }}
						</p>
					</div>
					<div :class="['p-2 border-r']">
						<h2 :class="['text-lg font-semibold mb-1']">
							VIX
						</h2>
						<p class="text-sm">
							{{ holding?.vix || 'N/A' }}
						</p>
					</div>
					<div :class="['p-2']">
						<h2 :class="['text-lg font-semibold mb-1']">
							S&P 500
						</h2>
						<p class="text-sm">
							{{ holding?.sp500 || 'N/A' }}
						</p>
					</div>
					<div :class="['p-2 bg-red-200 text-red-600']">
						<h2 :class="['text-lg font-semibold mb-1']">
							Ganancia/Perdida
						</h2>
						<p class="text-sm">
							{{ holding.profit }}
						</p>
					</div>
					<div :class="['p-2']">
						<h2 :class="['text-lg font-semibold mb-1']">
							Acciones
						</h2>
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" @click="openModal(holding)">
							Editar
						</button>
					</div>
				</div>
	
			</div>
	
			<!-- badge -->
			<div>
				<span
					class="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-200 border border-green-600 rounded-full">
					MEGA CORRECCIÓN
				</span>
			</div>
		</div>

	</template>


</template>
