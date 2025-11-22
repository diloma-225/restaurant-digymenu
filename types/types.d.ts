export interface Menu {
    id: number;
    libelle: string;
    descripotion: string;
    restaurant_id:number;
    created_at:string|null;
    updated_at:string|null;
}
export interface Restaurant {
    id: number;
    libelle: string;
    descripotion: string;
    restaurant_id:number;
    created_at:string|null;
    updated_at:string|null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Restaurant {
    id: number;
    tel: string;
    localisation: string;
    logo: string;
    cover_url: string;
    slug: string;
    color_code: string;
    created_at: string | null;
    updated_at: string | null;
    user: User;
  }

  export interface alergens {
    id: number;
    name: string;
    allergen_info: string; 
    created_at: string | null; 
    updated_at: string | null; 
  }
  export interface Plat {
    id: number;
    name: string;
    price: string;
    image: string;
    description: string;
    menu_id: number;
    category_id: number;
    created_at: string | null;
    updated_at: string | null;
    alergens: alergens[]; 
  }

 export interface Category {
    id: number;
    libelle: string;
    description: string;
    menu_id: number;
    created_at: string | null;  // Changer en Date si les dates sont traitées comme objets Date
    updated_at: string | null;  // Changer en Date si les dates sont traitées comme objets Date
    plats: Plat[];
}