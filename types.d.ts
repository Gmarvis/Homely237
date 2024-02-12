interface User {
  bio?: string;
  createdAt: string;
  email: string;
  id: string;
  idCard_image_back?: string;
  idCard_image_front?: string;
  image?: string;
  location?: string;
  location_plan?: string;
  name: string;
  password: string;
  phone?: string;
  role: string;
  service_title?: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: string;
  user_id: string;
  category_id: string;
  category_name: string;
  name: string;
  images: string[];
  product_image: string;
  rating?: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}
