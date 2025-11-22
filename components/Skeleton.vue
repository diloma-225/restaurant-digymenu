<template>
    <div class="w-full h-96 sm:h-32 xs:h-28 md:h-64 header-container relative">
      <div class="absolute inset-0 w-full h-full overflow-hidden cover shadow-md">
        <div class="absolute inset-0 object-cover w-full h-full sm:h-full bg-gray-300 animate-pulse"></div>
        <div class="filter-overlay"></div>
      </div>
  
      <div class="absolute w-full bottom-[-5%]">
        <div class="flex items-center justify-center mt-10 sm:mt-0 md:mt-5">
          <div
            class="w-[200px] h-[200px] md:w-[150px] md:h-[150px] sm:w-[80px] sm:h-[80px] overflow-hidden rounded-full flex items-center justify-center bg-gray-300 animate-pulse"
          ></div>
        </div>
      </div>
    </div>

    <div class="2xl:w-full h-20 sm:h-12 bg-opacity-20 menu-container bg-gray-200 animate-pulse">
        <!-- Conteneur de Squelette de Menu -->
        <div class="relative w-full h-full">
          <!-- Squelette pour le Swiper -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-full h-full mx-auto bg-gray-300 animate-pulse rounded-md"></div>
          </div>
        </div>
    </div>


    <div class="2xl:w-3/6 md:w-5/6 3xl:w-2/6 mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 mt-10 plats-card bg-gray-200 animate-pulse">
        <!-- Conteneur des Cartes -->
        <div class="bg-white border rounded p-4 flex sm:flex-col-reverse mb-5">
          <!-- Section du Texte -->
          <div class="w-4/6 flex flex-col justify-between">
            <!-- Squelette du Titre -->
            <div class="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
            <!-- Squelette de la Description -->
            <div class="w-full h-4 bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <!-- Squelette des Allergènes -->
            <div class="w-full flex space-x-2 mb-4">
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
            <!-- Squelette du Prix -->
            <div class="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <!-- Squelette de l'Image du Plat -->
          <div class="w-48 h-48 sm:w-full bg-gray-300 animate-pulse mr-4 rounded-lg"></div>
        </div>
    </div>
    <div class="2xl:w-3/6 md:w-5/6 3xl:w-2/6 mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 mt-10 plats-card bg-gray-200 animate-pulse">
        <!-- Conteneur des Cartes -->
        <div class="bg-white border rounded p-4 flex sm:flex-col-reverse mb-5">
          <!-- Section du Texte -->
          <div class="w-4/6 flex flex-col justify-between">
            <!-- Squelette du Titre -->
            <div class="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md mb-2"></div>
            <!-- Squelette de la Description -->
            <div class="w-full h-4 bg-gray-300 animate-pulse rounded-md mb-4"></div>
            <!-- Squelette des Allergènes -->
            <div class="w-full flex space-x-2 mb-4">
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
              <div class="w-1/4 h-4 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
            <!-- Squelette du Prix -->
            <div class="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          <!-- Squelette de l'Image du Plat -->
          <div class="w-48 h-48 sm:w-full bg-gray-300 animate-pulse mr-4 rounded-lg"></div>
        </div>
    </div>
  </template>
  
  <style scoped>
  /* Ajoutez des styles supplémentaires si nécessaire */
  </style>
  