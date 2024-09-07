enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PROVIDER = 'provider'
}

enum StatusType {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

enum AppointmentStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

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
  user_id?: string;
  category_id: string;
  category_name: string;
  name: string;
  images: string[];
  product_image: string;
  rating?: string;
  price: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}

interface CurrentLocation {
  city: string;
  continent: string;
  continentCode: string;
  countryCode: string;
  countryName: string;
  locality: string;
}

interface Appointment {
  id: string;
  sender_id: string;
  provider_id: string;
  product_id: string;
  description: string;
  city: string;
  locality: string;
  phone_number: string;
  location_details: string;
  date: Date;
  status: StatusType;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  location?: string;
  image?: string;
  location_plan?: string;
  bio?: string;
  idCard_image_front?: string;
  idCard_image_back?: string;
  service_title: string;
  role?: Role;
}

interface ErrorReturnType {
  error: string;
  status: number;
  message: string;
}

interface UpdateAppointment {
  description?: string;
  location?: string;
  status?: string;
}

interface NotificationType {
  id: string;
  type: string;
  sender_id: string;
  recipient_id: string;
  title: string;
  body: string;
  appointment_id: string;
  read_status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
