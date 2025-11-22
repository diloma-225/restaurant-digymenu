<template>
  <div v-if="!redirecting" class="h-screen flex items-center justify-center">
    <h1 class="text-3xl uppercase">EpiqHub</h1>
</div>
</template>

<script setup lang="ts">

const redirecting = ref(false);

onMounted(async () => {
  redirecting.value = true;
  // Attendre un petit délai avant la redirection
  setTimeout(async () => {
    await navigateTo('https://digymenu.netlify.app/', { external: true });
  }, 1000);  // délai de 1 seconde (ajuste si nécessaire)
});
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
/*.categorie.active {
  background: red;
  color: white;
}*/

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
