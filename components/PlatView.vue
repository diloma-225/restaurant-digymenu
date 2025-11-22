<template>
  <!-- Modal -->
  <div
    v-if="props.isModalVisible"
    :class="props.modalContainerClass"
    @click.self="hideModal"
  >
    <div
      class="w-2/6 h-[90%] md:h-[60%] sm:h-[70%] sm:w-5/6 relative flex flex-col items-center bg-white rounded-tl-lg rounded-tr-lg overflow-y-auto content"
      :class="{ active: props.animation }"
    >
      <span
        @click="hideModal"
        class="w-12 h-12 flex items-center justify-center text-white font-extrabold hover:cursor-pointer absolute bg-red-800 right-5 top-5 p-5 rounded-[100%]"
        >X</span
      >
      <img
        :src="loadImageFromStorage(props.selectedPlat)"
        alt="Dish Image"
        class="w-full h-[50%] object-cover rounded-tl-lg rounded-tr-lg plat-image"
      />
      <div class="w-full p-5">
        <h2 class="font-bold uppercase">{{ props.selectedPlat?.name }}</h2>
        <p class="description">{{ props.selectedPlat?.description }}</p>
        <div class="w-full mt-3 mb-6">
          <span
            class="p-2 rounded-xl text-xs bg-orange-100 mx-1"
            v-for="alergene in props.selectedPlat?.alergens"
            :key="alergene.id"
            :title="alergene.allergen_info"
            >{{ alergene.name }}</span
          >
        </div>
        <span
          class="w-3/6 p-2 text-center text-white text-xl"
          :style="{
            background: props.currentRestaurant?.color_code,
          }"
          >{{ props.selectedPlat?.price }} FCFA</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Plat, Restaurant } from "~/types/types";

const props = defineProps({
  currentRestaurant: {
    type: Object as PropType<Restaurant | null>,
  },
  selectedPlat: {
    type: Object as PropType<Plat | null>,
  },
  animation: Boolean,
  isModalVisible: Boolean,
  modalContainerClass: String,
});

const supabase = useSupabaseClient()

const emit = defineEmits(["hide-modal"]);

const hideModal = () => {
  emit("hide-modal");
};

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

<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  transition: background 0.3s ease-in-out;
  z-index: 999;
}

.content {
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.content.active {
  transform: translateY(0);
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
}
</style>
