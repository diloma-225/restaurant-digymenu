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

const dataLoading = ref(true);
const menuLoading = ref(false);
const platLoading = ref(false);

const supabase = useSupabaseClient()

// On attend que currentRestaurant soit disponible avant de récupérer l'URL du logo
const logoUrl = ref<string | null>(null);
const { currentRestaurant, getRestaurantInfos, menus, getMenuCategories, categories, plats, getPlatsByCategories, getPlatsByMenu, actifMenuId } = useRestaurant();

// Fonction pour obtenir l'URL de l'image
const getImageUrl = async (imageName: string) => {
  try {
    const { data } = await supabase
      .storage
      .from('logos')
      .getPublicUrl(imageName);

    if (data) {
      return data.publicUrl;
    }
    return null;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
};

// On met à jour logoUrl dès que currentRestaurant est disponible
watchEffect(async () => {
  if (currentRestaurant.value?.logo) {
    logoUrl.value = await getImageUrl(currentRestaurant.value.logo);
  }
});

// Utilisation des métadonnées SEO avec des valeurs dynamiques
watchEffect(() => {
  if (currentRestaurant.value) {
    useSeoMeta({
      title: `Menu - ${currentRestaurant.value.name}`,  // Dynamique en fonction du nom du restaurant
      ogTitle: `Menu - ${currentRestaurant.value.name}`,
      description: `${currentRestaurant.value.name} - Découvrez notre délicieux menu avec des plats faits maison.`,
      ogDescription: `${currentRestaurant.value.name} - Découvrez notre délicieux menu avec des plats faits maison.`,
      ogImage: logoUrl.value || '',  // URL dynamique de l'image du menu
      twitterCard: 'summary_large_image',
    });
  }
});

const actifMenu = ref(0);
const actifCat = ref(-1);

// Fonctions de récupération des menus et catégories
async function fetchMenu(id: string, index: number = 0) {
  menuLoading.value = true;
  try {
    await getMenuCategories(id);
    await getPlatsByMenu(id);
  } catch (error) {
    console.error('Error fetching menu:', error);
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
    console.error('Error fetching category plats:', error);
  } finally {
    actifCat.value = index;
    platLoading.value = false;
  }
}

const isModalVisible = ref(false);
const selectedPlat = ref(null);
const animation = ref(false);

// Gestion de la modal
const modalContainerClass = computed(() => {
  return isModalVisible.value ? "modal-container active" : "modal-container bg-none";
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

// Récupération des informations du restaurant au montage du composant
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
