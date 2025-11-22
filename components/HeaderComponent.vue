<template>
  <div class="w-full h-96 sm:h-32 xs:h-28 md:h-64 header-container relative">
      <div
      class="btn waiter-btn flex items-center justify-center gap-3 text-lg sm:text-sm py-3 px-5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md transition-all duration-300"
      :class="{ 'w-12': !isExpanded, 'w-72 h-36 top-10': isExpanded }"
       v-if="currentRestaurant"
    >
      <!-- Icône -->
      <div class="flex items-center justify-center" title="Appeler un serveur" @click="toggleExpansion" v-if="!isExpanded">
        <LucideConciergeBell class="w-6 h-6" />
      </div>
    
      <!-- Contenu visible uniquement lorsqu'élargi -->
      <div
        v-if="isExpanded"
        class="flex flex-col gap-3 ml-3 transition-opacity duration-300 w-full"
      >
        <span class="flex items-center justify-between  gap-2">
          Appeler un serveur <LucideX @click="toggleExpansion" class="w-6 h-6 text-red-500" />
        </span>
        <Select>
          <SelectTrigger class="w-full sm:w-[150px] text-sm">
            <SelectValue placeholder="Sélectionnez votre table" />
          </SelectTrigger>
          <SelectContent class="z-[99]">
            <SelectGroup>
              <SelectLabel>Tables</SelectLabel>
              <SelectItem value="table1">Table 1</SelectItem>
              <SelectItem value="table2">Table 2</SelectItem>
              <SelectItem value="table3">Table 3</SelectItem>
              <SelectItem value="table4">Table 4</SelectItem>
              <SelectItem value="table5">Table 5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          <button
          @click.stop="callWaiter"
          :disabled="isCalling"
          class="flex items-center justify-center gap-2 w-fit px-4 py-2 mt-1 rounded-md text-white transition-colors duration-200"
          :class="isCalling ? 'bg-green-600 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'"
        >
          <template v-if="!isCalling">
            <LucideHand class="w-5 h-5" />
            Appeler le serveur
          </template>
          <template v-else>
            <i class="fas fa-check"></i> Serveur en route
          </template>
        </button>
      </div>
    </div>
    <div class="absolute inset-0 w-full h-full overflow-hidden cover shadow-md">
      <img
        :src="getCoverUrl(currentRestaurant?.cover)"
        alt="Cover Image"
        class="absolute inset-0 object-cover w-full h-full sm:h-full"
      />
      <div class="filter-overlay"></div>
    </div>

    <div class="absolute w-full bottom-[-5%]">
      <h1 class="text-white text-4xl sm:text-[20px] font-extrabold flex items-center justify-center">{{currentRestaurant?.name}}</h1>
      <div class="flex items-center justify-center mt-10 sm:mt-0 md:mt-5">
        <div
          class="w-[200px] h-[200px] md:w-[150px]  md:h-[150px] sm:w-[80px] sm:h-[80px] overflow-hidden rounded-full flex items-center justify-center"
        >
          <img :src="getImageUrl(currentRestaurant?.logo)" alt="restaurant_logo" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const {currentRestaurant } = useRestaurant();

const isCalling = ref(false)
const isExpanded = ref(false)
const supabase = useSupabaseClient()


const callWaiter = ()=>{
  setTimeout(() => {
    isCalling.value = true;
  }, 100);
}
const toggleExpansion = ()=>{
  isCalling.value = false;
  isExpanded.value = !isExpanded.value;
}

const getImageUrl = (imageName:string) => {
 
  if (imageName) {
    const { data } = supabase
        .storage
        .from('logos')
        .getPublicUrl(`${imageName}`)

    if (data) {
      return data.publicUrl;
    }

    return null; // En cas d'erreur, tu peux retourner null ou gérer autrement
    }
};
const getCoverUrl = (imageName:string) => {
  try {
    const { data } = supabase
        .storage
        .from('covers')
        .getPublicUrl(`${imageName}`)

    if (data) {
      return data.publicUrl;
    }

    // Retourner l'URL publique de l'image
    
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null; // En cas d'erreur, tu peux retourner null ou gérer autrement
  }
};



</script>

<style scoped>
.cover {
  position: relative;
}

.filter-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust the opacity as needed */
  pointer-events: none; /* Ensures the overlay does not interfere with interactions */
}
@media screen and (max-width: 1024px) and (min-height: 1000px) {
  .header-container{
    height: 288px;
  }
}
.btn.waiter-btn {
  background-color: #ffcc00;
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  z-index: 99;
  right: 0;
  bottom: 0;
}

.btn.waiter-btn.is-loading {
  background-color: #4caf50;
  color: #fff;
  cursor: not-allowed;
}
.btn.waiter-btn:hover:not(.is-loading) {
  background-color: #ffc107;
}

</style>
