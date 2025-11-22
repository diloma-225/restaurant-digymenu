<template>
  <Swiper
    class="2xl:w-3/6 sm:w-5/6 3xl:w-2/6 mx-auto p-2 mt-5 gap-x-5 sm:gap-x-2 categorie-xl hidden"
    :slides-per-view="3.5"
    :space-between="25"
  >
    <SwiperSlide
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      v-if="categories && categories.length > 0"
      :class="{ '!bg-black text-white': props.actifCat === -1 }"
      @click.prevent="props.fetchMenu?.(props.menus[actifMenu].id, props.actifMenu)"
    >
      Tout 
    </SwiperSlide>
    <SwiperSlide
      v-for="(categorie, index) in categories"
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white active': index === props.actifCat }"
      @click.prevent="props.fetchCategoryPlats?.(categorie.id, index)"
    >
      {{ categorie.name }}
    </SwiperSlide>
  </Swiper>

  <Swiper
    class="2xl:w-3/6 sm:w-5/6 3xl:w-2/6 mx-auto p-2 mt-5 gap-x-5 sm:gap-x-2 categorie-lg hidden"
    :slides-per-view="3.5"
    :space-between="25"
  >
    <SwiperSlide
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white': props.actifCat === -1 }"
     @click.prevent="props.fetchMenu?.(props.menus[actifMenu].id, props.actifMenu)"
    >
      Tout 
    </SwiperSlide>
    <SwiperSlide
      v-for="(categorie, index) in props.categories"
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white active': index === props.actifCat }"
      @click.prevent="props.fetchCategoryPlats?.(categorie.id, index)"
    >
      {{ categorie.name }}
    </SwiperSlide>
  </Swiper>

  <Swiper
    class="2xl:w-5/6 3xl:w-2/6 mx-auto p-2 mt-5 gap-x-5 sm:gap-x-2 categorie-md hidden"
    :slides-per-view="2.8"
    :space-between="25"
  >
    <SwiperSlide
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white': props.actifCat === -1 }"
      @click.prevent="props.fetchMenu?.(props.menus[actifMenu].id, props.actifMenu)"
    >
      Tout 
    </SwiperSlide>
    <SwiperSlide
      v-for="(categorie, index) in props.categories"
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ 'bg-black text-white active': index === props.actifCat }"
      @click.prevent="props.fetchCategoryPlats?.(categorie.id, index)"
    >
      {{ categorie.name }}
    </SwiperSlide>
  </Swiper>

  <Swiper
    class="2xl:w-3/6 sm:w-5/6 3xl:w-2/6 mx-auto p-2 mt-5 gap-x-5 sm:gap-x-2 categorie-sm hidden"
    :slides-per-view="1.8"
    :space-between="15"
  >
    <SwiperSlide
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white': props.actifCat === -1 }"
 @click.prevent="props.fetchMenu?.(props.menus[actifMenu].id, props.actifMenu)"
    >
      Tout
    </SwiperSlide>
    <SwiperSlide
      v-for="(categorie, index) in props.categories"
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ 'bg-black text-white active': index === props.actifCat }"
      @click.prevent="props.fetchCategoryPlats?.(categorie.id, index)"
    >
      {{ categorie.name }}
    </SwiperSlide>
  </Swiper>

  <Swiper
    class="2xl:w-3/6 sm:w-5/6 3xl:w-2/6 mx-auto p-2 mt-5 gap-x-5 sm:gap-x-2 categorie-xs hidden"
    :slides-per-view="1.8"
    :space-between="15"
  >
    <SwiperSlide
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ '!bg-black text-white': props.actifCat === -1 }"
      @click.prevent="props.fetchMenu?.(props.menus[actifMenu].id, props.actifMenu)"
    >
      Tout
    </SwiperSlide>
    <SwiperSlide
      v-for="(categorie, index) in props.categories"
      class="rounded-2xl sm:rounded-2xl flex items-center justify-center bg-gray-100 text-md sm:text-sm text-black p-2 uppercase cursor-pointer hover:text-white hover:bg-black categorie"
      style="display: flex; align-items: center; justify-content: center"
      :class="{ 'bg-black text-white active': index === props.actifCat }"
      @click.prevent="props.fetchCategoryPlats?.(categorie.id, index)"
    >
      {{ categorie.name }}
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import type { Category } from "~/types/types";
const props = defineProps({
  categories: {
    type:Array as PropType<Category[] | null>,
    required:true
  },
  actifCat: {
    type:Number,
    required:true
  },
  actifMenu: {
    type:Number,
    required:true
  },
  fetchMenu: {
    type:Function,
    required:true
  },
  menus:{
    type:Object,
    required:true
  },
  fetchCategoryPlats: Function,
});
</script>

<style scoped>
.categorie.active {
  background: black;
  color: white;
}
@media screen and (min-width: 1024px) {
  .categorie-sm,
  .categorie-md,
  .categorie-xs,
  .categorie-lg {
    display: none;
  }
  .menu-sm,
  .menu-md,
  .menu-xs,
  .menu-lg {
    display: none;
  }
  .categorie-xl,
  .menu-xl {
    display: flex;
  }
}
@media screen and (max-width: 1024px) {
  .categorie-sm,
  .categorie-md,
  .categorie-xs,
  .categorie-xl {
    display: none;
  }
  .menu-sm,
  .menu-md,
  .menu-xs,
  .menu-xl {
    display: none;
  }
  .categorie-lg,
  .menu-lg {
    display: flex;
  }
}

@media screen and (max-width: 1024px) and (min-height: 1000px) {
  .categorie-lg,
  .plats-card,
  .content {
    width: 70%;
  }
  .content {
    height: 60%;
  }
  .plat-image {
    height: 60%;
  }
}

@media screen and (max-width: 900px) {
  .categorie-lg,
  .categorie-sm,
  .categorie-xs,
  .categorie-xl {
    display: none;
  }
  .menu-lg,
  .menu-sm,
  .menu-xs,
  .menu-xl {
    display: none;
  }
  .categorie-md,
  .menu-md {
    display: flex;
  }
}
@media screen and (max-width: 639px) {
  .categorie-lg,
  .categorie-md,
  .categorie-xs,
  .categorie-xl {
    display: none;
  }
  .menu-lg,
  .menu-md,
  .menu-xs,
  .menu-xl {
    display: none;
  }
  .categorie-sm,
  .menu-sm {
    display: flex;
  }
}
@media screen and (max-width: 414px) {
  .categorie-lg,
  .categorie-md,
  .categorie-sm,
  .categorie-xl {
    display: none;
  }
  .menu-lg,
  .menu-md,
  .menu-sm,
  .menu-xl {
    display: none;
  }
  .categorie-xs,
  .menu-xs {
    display: flex;
  }
}
</style>
