import axios from 'axios';

//const config = useRuntimeConfig();
const instance = axios.create();
instance.defaults.baseURL = "http://localhost:8000/api";
instance.defaults.withCredentials= true;
//instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default defineNuxtPlugin((nuxtApp) => {
  // Injecter l'instance Axios dans le contexte Nuxt
  nuxtApp.provide('http', instance);
});