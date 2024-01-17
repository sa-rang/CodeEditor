<!-- src/views/Home.vue -->
<template>
    <div>
        <div v-if="!isLogin">
            <Login />
            <div class="p-5">
                <p class="text-lg border-b">Read insutruction before you start the test</p>
                <ul class="list-disc ">
                    <li>Once logged in do not refresh/reload the page</li>
                    <li>There will be 5 questions. They should be solved in order</li>
                    <li>You can not move back in test.</li>
                    <li>Once you complete and submit the last question, you will see the results</li>
                </ul>
            </div>
        </div>
        <div v-else>
            <router-link to="/assesment">Go to Assesment</router-link>
        </div>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';
import Login from "../components/Login.vue"
import { useWidgetStore } from '../stores/widget'

const widgetStore = useWidgetStore()

const isLogin = computed(() => widgetStore.isUserLogin);
</script>
  
<style scoped>
/* Component styles go here */
</style>