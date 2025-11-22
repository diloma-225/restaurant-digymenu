<template>
  <div
    class="2xl:w-3/6 md:w-5/6 3xl:w-2/6 mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 mt-10 plats-card"
  >
  <div
  v-for="plat in ungroupedItems"
  :key="plat.id"
  @click="props.showModal?.(plat)"
  class="bg-white border rounded p-4 flex sm:flex-col-reverse mb-5 hover:cursor-pointer">
  <div class="w-4/6">
    <h2 class="font-bold uppercase">{{ plat.name }}</h2>
    <p class="description" v-if="plat && plat.description">
      {{ truncateText(plat.description, 100) }}
    </p>
    <div class="w-full mt-3 mb-6">
<!--           <span
        class="p-2 rounded-xl text-xs bg-orange-100 mx-1"
        v-for="alergene in plat.alergens"
        :key="alergene.id"
        :title="alergene.allergen_info"
        >{{ alergene.name }}</span
      > -->
    </div>
    <span
      class="w-3/6 p-2 text-center text-white text-xl"
      :style="{
        background: props.currentRestaurant?.color_code,
      }"
      >{{ plat.price }} FCFA</span
    >
  </div>
  <img
    :src="loadImageFromStorage(plat)"
    alt="Dish Image"
    class="w-48 h-48 sm:w-full object-cover mr-4 rounded-lg"
  /> 
</div>
    
    <div v-for="(group, subCategoryId) in groupedItems" :key="subCategoryId">
      <h3 class="flex items-center justify-center bg-black rounded-md text-white text-md sm:text-sm  p-2 uppercase my-2">{{ group.name }}</h3> <!-- Affiche le nom de la sous-catégorie -->
        <div
        v-for="plat in group.items"
        :key="plat.id"
        @click="props.showModal?.(plat)"
        class="bg-white border rounded p-4 flex sm:flex-col-reverse mb-5 hover:cursor-pointer">
        <div class="w-4/6">
          <h2 class="font-bold uppercase">{{ plat.name }}</h2>
          <p class="description" v-if="plat && plat.description">
            {{ truncateText(plat.description, 100) }}
          </p>
          <div class="w-full mt-3 mb-6">
    <!--           <span
              class="p-2 rounded-xl text-xs bg-orange-100 mx-1"
              v-for="alergene in plat.alergens"
              :key="alergene.id"
              :title="alergene.allergen_info"
              >{{ alergene.name }}</span
            > -->
          </div>
          <span
            class="w-3/6 p-2 text-center text-white text-xl"
            :style="{
              background: props.currentRestaurant?.color_code,
            }"
            >{{ plat.price }} FCFA</span
          >
        </div>
        <img
          :src="loadImageFromStorage(plat)"
          alt="Dish Image"
          class="w-48 h-48 sm:w-full object-cover mr-4 rounded-lg"
        /> 
      </div>
    </div>

    
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Restaurant, Plat } from "~/types/types";

const props = defineProps({
  currentRestaurant: {
    type: Object as PropType<Restaurant | null>,
  },
  showModal: Function,
  plats: Array,
});

const groupedItems = computed(() => {
  if (!props.plats) return {};

  return props.plats.reduce((acc, item) => {
    if (item.sub_categories?.id) { // Vérifie que `sub_categories` existe et a un `id`
      if (!acc[item.sub_categories.id]) {
        acc[item.sub_categories.id] = {
          name: item.sub_categories.name, // Stocke le nom de la sous-catégorie
          items: [],
        };
      }
      acc[item.sub_categories.id].items.push(item);
    }
    return acc;
  }, {});
});

const ungroupedItems = computed(() => {
  if (!props.plats) return [];
  return props.plats.filter(item => !item.sub_categories);
});


const supabase = useSupabaseClient()

function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}
const loadImageFromStorage =  (item) => {
  
    if (item) {
        // Si le logo n'a pas de prévisualisation, on charge l'image depuis Storage
        const { data } = supabase
            .storage
            .from('images')
            .getPublicUrl(`${item.image}`)
        
        
        if (item.image) {
          
          
            return data.publicUrl;
            
        }else{
            return '/dish.jpg';
        }
        
    }
    return '/dish.jpg'; 
}


</script>

<style scoped></style>
