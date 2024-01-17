<template>
    <div class="border p-5 min-w-96">
        <h1 class="text-center mb-4">Login</h1>

        <form class="flex flex-col gap-2">
            <input
                class="flex h-10 w-full rounded-md border border-gray-500/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" placeholder="User Id" v-model="loginForm.username" />
            <input
                class="flex h-10 w-full rounded-md border border-gray-500/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password" placeholder="Password" autocomplete="on" v-model="loginForm.password" />
            <button type="submit"
                class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                @click.prevent="login">
                Login
            </button>
        </form>
        <div v-if="errMessage" class="text-center mt-3 text-red-400">
            <span>{{ errMessage }}</span>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useWidgetStore } from '../stores/widget'
import router from "@/router";
const API_URL = import.meta.env.VITE_BE_ENDPOINT

const loginForm = ref({
    username: "",
    password: ""
})

const errMessage = ref(null)
const widgetStore = useWidgetStore()


const login = async () => {
    //Static logic for example :: this should be validated from BE in real
    if (loginForm.value.username && loginForm.value.password) {
        //API call to BE here
        try {
            const rawResponse = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: loginForm.value.username,
                    pass: loginForm.value.password
                })
            });
            const content = await rawResponse.json();
            console.log(content)
            if (content.login) {
                widgetStore.setLogin(content)
                //Route to assesment
                router.push({ name: "Assesment" });
            } else {
                errMessage.value = content?.message;
            }
        } catch (error) {
            console.log("ERROR: Problem in code execution")
        }

    }


}

</script>

<style scoped></style>