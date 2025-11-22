<template>
  <div class="2xl:w-3/6 sm:w-4/6 xs:w-5/6 md:w-4/6 3xl:w-2/6 mx-auto my-5">
    <div class="flex gap-5 items-center my-5">
      <img src="/icons/tel.png" class="w-10 sm:w-8" />
      <span class="text-lg sm:text-sm font-medium text-[#D9D9D9]">{{formatTel(currentRestaurant?.phone)}}</span>
    </div>
    <div class="flex gap-5 items-center my-5">
      <img src="/icons/location.png" class="w-10 sm:w-8" />
      <span class="text-lg sm:text-sm font-medium text-[#D9D9D9]">{{currentRestaurant?.address  }}</span>
    </div>
    <div class="w-full flex justify-center">
      <nuxt-link to="https://epiqHub.ci">
        <img src="/logo.png" class="w-24 mx-auto" />
      </nuxt-link>
      
    </div>
    <p class="text-center sm:text-xs 2xl:text-md font-bold">
      Copyright 2024 | <a href="#" class="text-[#999999]  underline font-normal">Conditions générales d’utilisation</a>
    </p>
  </div>

</template>

<script setup lang="ts">
const {currentRestaurant } = useRestaurant();
function formatTel(numero: string): string {
  if (!numero) return ""; // Empêcher les erreurs sur une valeur vide


  return "+225 " + numero;
}

</script>

<style scoped></style>
