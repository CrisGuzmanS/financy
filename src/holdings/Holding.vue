<script setup>

import { Format } from '../helpers/Format.js';
import { unformat } from '../helpers/unformat.js';

defineProps({
    stock: Object,
    dolar: String,
    holding: Object
})

function openModal(holding) {
	toEdit.value = holding
	dialog.value = true
}

</script>
<template>

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
                        {{ Format.money(unformat(stock?.price ||
                            0) * unformat(dolar)) }}
                    </p>
                </div>

                <div :class="['p-2 bg-green-200 text-green-600']">
                    <h2 :class="['text-lg font-semibold mb-1']">
                        Caida actual
                    </h2>
                    <p class="text-sm">
                        -{{ stock?.drawdown || 0 }}
                    </p>
                </div>

                <div :class="['p-2 border-r']">
                    <h2 :class="['text-lg font-semibold mb-1']">
                        Número de acciones
                    </h2>
                    <p class="text-sm">
                        {{ holding?.quantity || 0 }}
                    </p>
                </div>
                <div :class="['p-2 border-r']">
                    <h2 :class="['text-lg font-semibold mb-1']">
                        Costo promedio
                    </h2>
                    <p class="text-sm">
                        {{ Format.money(holding?.cost?.average || 0) }}
                    </p>
                </div>
                <div :class="['p-2 border-r']">
                    <h2 :class="['text-lg font-semibold mb-1']">
                        Costo total
                    </h2>
                    <p class="text-sm">
                        {{ Format.money(holding?.cost?.total || 0) }}
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
                        {{ holding?.profit }}
                    </p>
                </div>
                <div :class="['p-2']">
                    <h2 :class="['text-lg font-semibold mb-1']">
                        Acciones
                    </h2>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        @click="openModal(holding)">
                        Editar
                    </button>
                </div>
            </div>

        </div>
    </div>

</template>