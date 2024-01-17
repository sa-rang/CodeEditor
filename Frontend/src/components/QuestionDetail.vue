<template>
    <div v-if="getSelectedQuestion" class="p-5">
        <h2 class="text-lg font-bold">
            {{ getSelectedQuestion.title }}
        </h2>

        <div class="border-t border-t-black my-4">
            <p class="text-base font-bold mt-4">
                {{ getSelectedQuestion.instruction }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWidgetStore } from '../stores/widget'
import { storeToRefs } from 'pinia';

const widgetStore = useWidgetStore()
const { getSelectedQuestion } = storeToRefs(widgetStore);

</script>

<style scoped></style>