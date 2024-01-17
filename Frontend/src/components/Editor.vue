
<template>
  <div v-if="getSelectedQuestion">
    <Codemirror v-model:value="getSelectedQuestion.initialCode" :options="cmOptions" border
      placeholder="Write your code here.." @change="changeInEditor" />

    <div class="flex justify-between my-3">
      <button type="button" @click="executeCode"
        class="rounded-md bg-blue-800 px-6 py-2 text-xl font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
        Run
      </button>
      <button type="button" v-if="getSelectedQuestionIndex < getQuestion.length - 1" @click="moveToNext"
        class="rounded-md bg-blue-800 px-6 py-2 text-xl font-semibold text-white shadow-sm hover:bg-blue-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
        Solve Next Question
      </button>
      <button type="button" v-if="getSelectedQuestionIndex == getQuestion.length - 1" @click="moveToNext"
        class="rounded-md bg-green-800 px-6 py-2 text-xl font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
        Submit The Assesment
      </button>
    </div>
    <div v-if="outputHolder" class="bg-black rounded text-gray-100 p-3">
      Output:
      <p>
        {{ outputHolder }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Codemirror from "codemirror-editor-vue3";

// placeholder
import "codemirror/addon/display/placeholder.js";

// language
import "codemirror/mode/javascript/javascript.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// theme
import "codemirror/theme/dracula.css";
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import router from "@/router";
import { useWidgetStore } from '../stores/widget'
import { storeToRefs } from 'pinia';

const widgetStore = useWidgetStore()
const { getSelectedQuestion, getSelectedQuestionIndex, getQuestion } = storeToRefs(widgetStore);
const API_URL = import.meta.env.VITE_BE_ENDPOINT

const cmOptions = ref({
  mode: "text/javascript", // Language mode
  theme: "dracula", // Theme
  autoCloseTags: true,
  autoCloseBrackets: true,
})

const outputHolder = ref("");
let debounceHolder = null;

onMounted(() => {
  saveProgress();
})

const changeInEditor = () => {
  try {
    // debounce for too many key stroke events
    clearTimeout(debounceHolder);

    debounceHolder = setTimeout(() => {
      widgetStore.saveProgress({ qId: getSelectedQuestion.value.qId, code: getSelectedQuestion.value.initialCode })
    }, 500);

  } catch (error) {
    console.error('Error in Saving progress:', error);
  }
}

//Run the individual test code
const executeCode = async () => {
  if (getSelectedQuestion.value.initialCode) {
    try {
      const rawResponse = await fetch(`${API_URL}/execute`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          script: getSelectedQuestion.value.initialCode,
        })
      });
      const content = await rawResponse.json();
      if (content?.output) {
        outputHolder.value = content?.output
      }
    } catch (error) {
      console.log("ERROR: Problem in code execution")
    }
  }
}

//Move to next Question
const moveToNext = () => {
  //Check if Last question in list then move to result page
  if (getSelectedQuestionIndex.value == getQuestion.value.length - 1) {
    if (confirm('Are you sure you want to submit the Assesment?')) {
      //Run assesment in Background and save result
      widgetStore.runAssesment(getSelectedQuestion.value.qId);

      //Set the assesment as finished
      widgetStore.setAssesmentCompleted();

      router.push({ name: "Result" });
      outputHolder.value = ""
    }
  } else {
    if (confirm('You wont be able to come to this quetsion again, are you sure you want to move to next?')) {
      //Run assesment in Background and save result
      widgetStore.runAssesment(getSelectedQuestion.value.qId);

      //Move to next question
      widgetStore.selectNextQuestion();
      saveProgress();
      outputHolder.value = ""
    }
  }
}

const saveProgress = () => {
  widgetStore.saveProgress({ qId: getSelectedQuestion.value.qId, code: getSelectedQuestion.value.initialCode })
}

</script>

<style scoped>
.codemirror-container {
  font-size: 18px;
  min-height: calc(60vh - 20px);
  background-color: #282a36
}
</style>
