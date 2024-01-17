

<template>
  <div class="bg-stone-900 text-gray-300 flex justify-center h-[100vh]">
    <div class="w-full pt-5">
      <header>
        <div class="flex items-center justify-center gap-x-3">
          <h1 class="text-xl font-bold text-center">JDoodle Code Test</h1>
          <button type="button" v-if="isLogin"
            class="rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-1 m-"
            @click="logout">
            Logout
          </button>
        </div>
      </header>

      <main class="flex flex-col justify-center items-center p-5">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import router from "@/router";

import { useWidgetStore } from './stores/widget'
const widgetStore = useWidgetStore()

const isLogin = computed(() => widgetStore.isUserLogin);

const logout = () => {
  widgetStore.setLogout()
  router.push("/");
}

</script>

<style scoped></style>
