<template>
    <div class="flex flex-col  p-5">
        <div>
            <div v-for="(eachQ, index) in getQuestion" :key="eachQ.qId" class="border rounded my-3 p-2"
                :class="eachQ.qId === selectedQuestion.qId ? 'bg-yellow-700 text-gray-200' : 'bg-gray-800 text-gray-600'">
                {{ index + 1 }}. {{ eachQ.title }}
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWidgetStore } from '../stores/widget'
import { storeToRefs } from 'pinia';

const widgetStore = useWidgetStore();

const { getQuestion, selectedQuestion } = storeToRefs(widgetStore);

</script>

<style scoped></style>