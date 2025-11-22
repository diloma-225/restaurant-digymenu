<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="toggleDropdown"
        type="button"
        class="flex items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <FlagComponent :contry="selectedOption.flag" />
        <span class="md:hidden">{{ selectedOption.libelle }}</span>
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.061a.75.75 0 011.08 1.04l-4.25 4.656a.75.75 0 01-1.08 0l-4.25-4.656a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="origin-top-right right-0 mt-2 w-56 md:w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div
        class="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          v-for="option in options"
          :key="option.id"
          :class="{ 'bg-gray-100': selectedOption.id == option.id }"
          @click.prevent="setTraduction(option)"
        >
          <FlagComponent :contry="option.flag" />
          <span class="md:hidden">{{ option.libelle }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface optionType {
  id: number;
  libelle: string;
  flag: string;
}

const options = <optionType[]>[
  {
    id: 1,
    libelle: "Français",
    flag: "fr",
  },
  {
    id: 2,
    libelle: "Anglais",
    flag: "en",
  },
  {
    id: 3,
    libelle: "Espagnole",
    flag: "sp",
  },
];
const selectedOption = ref(options[0]);
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function setTraduction(option: optionType) {
  selectedOption.value = option;
  isOpen.value = !isOpen.value;
}
</script>

<style scoped></style>
