import { AxiosInstance } from 'axios';


declare module 'nuxt/app' {
  interface NuxtApp {
    $http: AxiosInstance;
  }
}