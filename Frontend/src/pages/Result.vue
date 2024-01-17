<!-- src/views/Home.vue -->
<template>
    <div>
        <h1 class="text-xl mb-4 text-center">Assesment Result</h1>
        <div class="flex flex-wrap gap-3 text-black">
            <div v-for="eachResult in  getAssesmentResult" :key=eachResult.output.qid
                class="border bg-yellow-100 rounded p-3 min-w-[332px]">
                <h2 class="text-lg font-bold mb-3">
                    {{ eachResult.output.title }}
                </h2>
                <div v-for="eachTest, index in eachResult.output.results" :key="index"
                    class="border rounded p-2 bg-green-300 mb-2 font-semibold" :class="{ 'bg-red-400': !eachTest.result }">
                    <p>Case : {{ eachTest.input }}</p>
                    <p>Expected : {{ eachTest.expected }}</p>
                    <p>Actual : {{ eachTest.actual }}</p>
                    <p>Result: {{ eachTest.result ? "PASS" : "FAIL" }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useWidgetStore } from '../stores/widget'
import { storeToRefs } from 'pinia';

const widgetStore = useWidgetStore()
const { getAssesmentResult } = storeToRefs(widgetStore);

</script>
  
<style scoped>
/* Component styles go here */
</style>