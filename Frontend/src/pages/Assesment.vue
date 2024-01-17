<!-- src/views/Home.vue -->
<template>
    <div class="flex w-full justify-between">
        <div class="bg-stone-800 w-1/4">
            <QuestionDetail />
        </div>
        <div class="bg-zinc-700 w-1/2 p-2">
            <Editor />
        </div>
        <div class="bg-stone-800 w-1/4 flex flex-col justify-between">

            <QuestionSet />
        </div>

    </div>
</template>
  
<script setup>
import Editor from "../components/editor.vue"
import QuestionSet from "../components/QuestionSet.vue"
import QuestionDetail from "../components/QuestionDetail.vue"
</script>
  
<style scoped>
/* Component styles go here */
</style>