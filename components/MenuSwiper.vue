<template>

    <div class="2xl:w-full h-20 sm:h-12 bg-opacity-20 menu-container"
    :style="{
    backgroundColor: props.currentRestaurant?.color_code ? `rgba(${hexToRgb(props.currentRestaurant?.color_code).join(', ')}, 0.5)` : 'transparent'
    }"
    v-if="props.currentRestaurant">
       <Swiper
          class="2xl:w-4/6 sm:w-5/6 3xl:w-2/6 menu-xl h-full mx-auto"
          :slides-per-view="4.5"
          :space-between="25">
          <SwiperSlide
          v-for="(menu, index) in menus"
          :key="menu.id"
          class="uppercase sm:text-sm relative pb-2 sm:pb-0 border-b-4 sm:border-b-2 h-full cursor-pointer menu-swiper"
          :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: props.currentRestaurant.color_code,
              borderColor: index == props.actifMenu ? props.currentRestaurant.color_code : 'transparent',
              '--hover-border-color': props.currentRestaurant.color_code
          }"
          @click.prevent="props.fetchMenu?.(menu.id, index)">
          {{ menu.name }} 
          </SwiperSlide>
      </Swiper>

     <Swiper
        class="2xl:w-4/6 sm:w-5/6 3xl:w-2/6 menu-lg h-full mx-auto"
        :slides-per-view="4.8"
        :space-between="25">
        <SwiperSlide
        v-for="(menu, index) in menus"
        :key="menu.id"
        class="uppercase sm:text-sm relative pb-2 sm:pb-0 border-b-4 sm:border-b-2 h-full cursor-pointer menu-swiper"
        :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: props.currentRestaurant.color_code,
        borderColor: index === props.actifMenu ? props.currentRestaurant.color_code : 'transparent',
        '--hover-border-color': props.currentRestaurant.color_code
        }"
        @click.prevent="props.fetchMenu?.(menu.id, index)">
          {{ menu.name }} 
        </SwiperSlide>
    </Swiper>

    <Swiper
        class="2xl:w-4/6 sm:w-5/6 3xl:w-2/6 menu-md h-full mx-auto"
        :slides-per-view="3.8"
        :space-between="25"
    >
        <SwiperSlide
        v-for="(menu, index) in menus"
        :key="menu.id"
        class="uppercase sm:text-sm relative pb-2 sm:pb-0 border-b-4 sm:border-b-2 h-full cursor-pointer menu-swiper"
        :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: props.currentRestaurant.color_code,
        borderColor: index === props.actifMenu ? props.currentRestaurant.color_code : 'transparent',
        '--hover-border-color': props.currentRestaurant.color_code
        }"
        @click.prevent="props.fetchMenu?.(menu.id, index)"
        >
        {{ menu.name }}
        </SwiperSlide>
    </Swiper>

    <Swiper
        class="2xl:w-4/6 sm:w-5/6 3xl:w-2/6 menu-sm h-full mx-auto"
        :slides-per-view="2.6"
        :space-between="25"
    >
        <SwiperSlide
        v-for="(menu, index) in menus"
        :key="menu.id"
        class="uppercase sm:text-sm relative pb-2 sm:pb-0 border-b-4 sm:border-b-2 h-full cursor-pointer menu-swiper"
        :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: props.currentRestaurant.color_code,
        borderColor: index === props.actifMenu ? props.currentRestaurant.color_code : 'transparent',
        '--hover-border-color': props.currentRestaurant.color_code
        }"
        @click.prevent="props.fetchMenu?.(menu.id, index)"
        >
        {{ menu.name }} vv
        </SwiperSlide>
    </Swiper>

    <Swiper
        class="2xl:w-4/6 sm:w-5/6 3xl:w-2/6 menu-xs h-full mx-auto"
        :slides-per-view="2.5"
        :space-between="25">
        <SwiperSlide
        v-for="(menu, index) in menus"
        :key="menu.id"
        class="uppercase sm:text-sm relative pb-2 sm:pb-0 border-b-4 sm:border-b-2 h-full cursor-pointer menu-swiper"
        :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: props.currentRestaurant.color_code,
        borderColor: index === props.actifMenu ? props.currentRestaurant.color_code : 'transparent',
        '--hover-border-color': props.currentRestaurant.color_code
        }"
        @click.prevent="props.fetchMenu?.(menu.id, index)"
        >
        {{ menu.name }}
        </SwiperSlide>
    </Swiper> 

    </div>


</template>
  
<script setup lang="ts">
  import { useNuxtApp, useRoute } from "nuxt/app";
  import type { Menu, Restaurant } from "~/types/types";
  import { type PropType } from "#imports";

  const props = defineProps({
    fetchMenu:{
      type:Function
    },
    currentRestaurant:{
        type:Object,
    },
    actifMenu:{
        type:Number,
        default:0
    },
    menus:{
      type:Object
    }
  })
  
  const supabase = useSupabaseClient()
  
  /*   const {menus } = useRestaurant(); */
  /* const menus = ref([]) */

  onMounted(async () => {
  /*   const { data, error } = await supabase
        .from('menus')
        .select('*')
        .eq('restaurant_id', props.currentRestaurant.id)

        if (data) {
          menus.value = data
        } */
  })
  
  const hexToRgb = (hex: string): number[] => {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)!
    .map(x => parseInt(x, 16));
    };

  </script>
  
  <style scoped>
  .menu-container{
    --tw-bg-opacity: 0.5;
  }
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
  
  .cover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
    pointer-events: none; /* Ensure the overlay does not block interactions */
  }
  
  a.active {
    border-bottom: 4;
  }
  .categorie.active {
    background: black;
    color: white;
  }
  
  .truncate {
    overflow-y: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  