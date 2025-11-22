import { Select } from './../.nuxt/components.d';
import { useNuxtApp } from "nuxt/app";
import type { Menu, Restaurant } from "~/types/types";
import { isAxiosError } from 'axios';

export const useRestaurant = () => {
  const { $http } = useNuxtApp();

  // Utilisation de useState pour créer des états réactifs globaux
  const currentRestaurant = useState('currentRestaurant', () => null);
  const menus = useState('menus', () => null);
  const categories = ref<any[] | null>(null);
  const plats =  ref<any[] | null>(null);
  const actifMenuId =  ref<number|null>(null);
  const supabase = useSupabaseClient()

  async function is_subscription_valid(user_id:string) {
    const supabase = useSupabaseClient();
    const router = useRouter()
    
    try {
      // Appel RPC pour vérifier la validité de l'abonnement
      const { data, error } = await supabase
        .rpc('check_user_subscription_validity', {
          profile_user_id: user_id,
        });
  
      if (error) {
        // Gérer l'erreur ici
        console.error('Error checking subscription:', error.message);
        return false;
      }
      
      if (!data) {        
        router.push('/subscription-end');
        return false;
      }else{
        return true;
      }
  
      
  
    } catch (err) {
      // Gestion des erreurs réseau ou autres erreurs d'exécution
      throw new Error(`Error checking subscription: ${err.message}`);
    }
  }

  const getRestaurantInfos = async (restaurantName:string) => {
    const normalizedRestaurantName = restaurantName.replace('-', ' ').toLowerCase();
    
    try {
      const { data, error } = await supabase
      .from('restaurants')
      .select('id,name,description,address,created_at,logo,cover,color_code,phone, user_id, menus(id, name)')
      .ilike('name', normalizedRestaurantName.replace('-', ' '))
      .single(); // On s'attend à un seul résultat
      if (data) {
        const isValid = await is_subscription_valid(data.user_id);
        if (!isValid) return; 
        currentRestaurant.value = data;

        menus.value = data.menus
        if (menus.value && menus.value.length > 0) {
          const firstMenuId = menus.value[0].id; 
          if (firstMenuId) {
            let { data: menuCategories, error } = await supabase
            .from('categories')
            .select("id, name")
            // Filters
            .eq('menu_id', firstMenuId)

            categories.value = menuCategories;
            if (menuCategories) {
              let { data: platsData, error } = await supabase
              .from('items')
              .select('id, name, price, image, description')
              .eq('menu_id', firstMenuId)

              if (platsData) {
                plats.value = platsData;
              }
              
              
            }
          }       
          
        }
        
      }else{
        return navigateTo('/not-found');
      }
      
      
      //getRestaurantMenus(data.id); 
    } catch (error) {
        return navigateTo('/not-found');
    }
  }

  const getRestaurantMenus = async (id:number) => {
    try {
      const response = await $http.get(`/restaurants/${id}/menu`);
      menus.value = response.data;
      if (menus.value && menus.value.length > 0) {
        const firstMenuId = menus.value[0].id;        
        await getMenuCategories(firstMenuId);
        await getPlatsByMenu(firstMenuId);
        if ( actifMenuId.value==null) {
          actifMenuId.value = menus.value[0].id;
        }
        
      }
    } catch (error) {
      /* console.error('Error fetching restaurant menus:', error); */
    }
  }
  
  const getMenuCategories = async (id:string) => {
    if (!id) {
      return;
    }
    try {
      let { data: menuCategories, error } = await supabase
      .from('categories')
      .select("id, name")
      // Filters
      .eq('menu_id', id)

      categories.value = menuCategories;
      //await getPlatsByMenu(currentRestaurant.value?.id);
    } catch (error) {
      console.error('Error fetching menu categories:', error);
      categories.value = null;
    }
  }

  const getPlatsByMenu = async (id:string) => {
    if (!id) {
      return;
    }
    try {
      let { data: platsData, error } = await supabase
      .from('items')
      .select('id, name, price, image, description, sub_categories(id, name)')
      .eq('menu_id', id)
      
      if (platsData) {
        plats.value = platsData;
      }
    } catch (error) {
      console.error('Error fetching menu categories:', error);
      plats.value = null;
    }
  }
  const getPlatsByCategories = async (id:string) => {
    if (!id) {
        console.error("L'ID fourni est invalide");
        return null;
    }

    try {
        // Récupérer la catégorie ou la sous-catégorie
        const { data: categoryData, error: categoryError } = await supabase
            .from("categories")
            .select("id, menu_id")
            .eq("id", id)
            .single(); // Un seul résultat attendu

        if (categoryError || !categoryData) {
            console.error("Catégorie introuvable ou erreur :", categoryError?.message);
            return null;
        }

        // Récupérer les plats appartenant à cette catégorie ou sous-catégorie
        const { data: platsList, error: platsError } = await supabase
            .from("items")
            .select("*")
            .or(`category_id.eq.${id}, sub_category_id.eq.${id}`) // Vérifie les deux cas
            .eq("menu_id", categoryData.menu_id) // Vérifie qu'ils appartiennent bien au menu

        if (platsError) {
            console.error("Erreur lors de la récupération des plats :", platsError.message);
            return null;
        }
        plats.value = platsList;
        return platsList;
    } catch (err) {
        console.error("Erreur inattendue :", err);
        return null;
    }
};


  
  return {
    getRestaurantInfos,
    getRestaurantMenus,
    currentRestaurant,
    menus,
    getMenuCategories,
    categories,
    plats,
    getPlatsByCategories,
    getPlatsByMenu,
    actifMenuId
  }
}
