<template>
  <Skeleton v-if="dataLoading" />
  <div class="relative" v-else>
    <HeaderComponent></HeaderComponent>

    <MenuSwiper
      :fetchMenu="fetchMenu"
      :actifMenu="actifMenu"
      :menus="menus"
      :currentRestaurant="currentRestaurant"
    />

    <SkeletonMenu v-if="menuLoading" />

    <div v-else>
      <CategorieSwiper
        :categories="categories"
        :actifCat="actifCat"
        :actifMenu="actifMenu"
        :fetchMenu="fetchMenu"
        :menus="menus"
        :fetchCategoryPlats="fetchCategoryPlats"
      />

      <SkeletonPlat v-if="platLoading" />
      <PlatList
        :plats="plats"
        :currentRestaurant="currentRestaurant"
        :showModal="showModal"
        v-else
      />
    </div>
    <!-- Modal -->
    <PlatView
      :isModalVisible="isModalVisible"
      :selectedPlat="selectedPlat"
      :currentRestaurant="currentRestaurant"
      :animation="animation"
      :modalContainerClass="modalContainerClass"
      @hide-modal="hideModal"
    />

    <Footer />

    <GTranslate />

  </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from "nuxt/app";

const dataLoading = ref(true);
const menuLoading = ref(false);
const platLoading = ref(false);

const {
  currentRestaurant = {},
  getRestaurantInfos,
  menus,
  getMenuCategories,
  categories,
  plats,
  getPlatsByCategories,
  getPlatsByMenu,
  actifMenuId,
} = useRestaurant();

const actifMenu = ref(0);
const actifCat = ref(-1);

async function fetchMenu(id: string, index: number = 0) {
  
  
  menuLoading.value = true;
  try {
    await getMenuCategories(id);
    await getPlatsByMenu(id);
  } catch (error) {
  } finally {
    actifMenu.value = index;
    actifCat.value = -1;
    menuLoading.value = false;
  } 
}
async function fetchCategoryPlats(id: number, index: number = 0) {
  platLoading.value = true;
  try {
    await getPlatsByCategories(id);
  } catch (error) {
  } finally {
    actifCat.value = index;
    platLoading.value = false;
  }
}

const isModalVisible = ref(false);
const selectedPlat = ref(null);
const animation = ref(false);

const modalContainerClass = computed(() => {
  return isModalVisible ? "modal-container active" : "modal-container bg-none";
});

function showModal(plat: any) {
  selectedPlat.value = plat;
  isModalVisible.value = true;
  setTimeout(() => {
    animation.value = true;
  }, 100);
}

function hideModal() {
  animation.value = false;
  setTimeout(() => {
    isModalVisible.value = false;
    selectedPlat.value = null;
  }, 100);
}

onMounted(async () => {
  const route = useRoute();
  dataLoading.value = true;
  try {
    await getRestaurantInfos(route.params.restaurant);
  } catch (error) {
    console.error("Failed to fetch restaurant info:", error);
  } finally {
    dataLoading.value = false;
  }
});
</script>

<style scoped>
.menu-container {
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
