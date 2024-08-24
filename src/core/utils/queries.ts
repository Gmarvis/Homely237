import { SERVER_URL } from './constant';
import ApiCall from './httpClient';

const apiCall = new ApiCall();

type SigUpType = {
  name: string;
  email: string;
  password: string;
};

// SIGN UP
export const SIGNUP = (newUser: SigUpType) => {
  return apiCall.POST(SERVER_URL + '/auth/signup', newUser);
};

type LoginType = {
  email: string;
  password: string;
};

// LOGIN
export const LOGIN = (returningUser: LoginType) => {
  // console.log(returningUser);
  return apiCall.POST(SERVER_URL + '/auth/login', returningUser);
};

// Get user by ID
// export const getUserById = (id: string) => {
//   return apiCall.GET(`${SERVER_URL}/users/${id}`, { cache: 'no-store' });
// };

// Get Profile
export const getProfile = (id: string) => {
  return apiCall.GET(`${SERVER_URL}/users/${id}`, { cache: 'no-store' });
};

// GET ALL PRODUCT CATEGORIES
export const getAllCategories = () => apiCall.GET(SERVER_URL + '/categories');

// CREATE SERVICE(PRODUCT)
type SevType = {
  user_id: string;
  name: string;
  category_name: string;
  images: [];
  product_image: string;
  price: string;
  category_id: string;
  description: string;
};
export const createService = (serviceDetails: SevType) => {
  return apiCall.POST(SERVER_URL + '/products', serviceDetails);
};

// GET ALL SERVICES
export const getAllServices = () => {
  return apiCall.GET(SERVER_URL + '/products');
};

// GET SERVICE(PRODUCT) BY THE USER_ID
export const getServiceByUserID = (user_id: string) => {
  return apiCall.GET(SERVER_URL + `/products/user/${user_id}`);
};

// GET SINGLE PRODUCT BY PRODUCT ID
export const getServiceByServiceID = (product_id: string): Promise<any> => {
  try {
    return apiCall.GET(`${SERVER_URL}/products/${product_id}`);
  } catch (error: any) {
    return error;
  }
};

// DELETE SERVICE
export const deleteService = async (service_id: string): Promise<any> => {
  try {
    return await apiCall.DELETE(SERVER_URL + `/products/${service_id}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

// GET SINGLE PRODUCT BY CATEGORY ID
export const getServiceByCategoryID = (category_id: string): Promise<any> => {
  try {
    return apiCall.GET(`${SERVER_URL}/products/category/${category_id}`);
  } catch (error: any) {
    return error;
  }
};

// UPDATE PRODUCT
export const updateService = (id: string, newData: any): any => {
  try {
    return apiCall.PUT(`${SERVER_URL}/products/${id}`, newData);
  } catch (error) {
    return error;
  }
};

export const getCurrentLocation = async (
  latitude: number,
  longitude: number
): Promise<CurrentLocation | undefined> => {
  try {
    const data = await apiCall.GET(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    if (data) {
      return {
        city: data.city,
        continent: data.continent,
        continentCode: data.continentCode,
        countryCode: data.countryCode,
        countryName: data.countryName,
        locality: data.locality
      };
    }
  } catch (error) {}
};

// Create appointments
export const createAppointment = async (appointmentData: {}) => {
  try {
    const data = await apiCall.POST(`${SERVER_URL}/appointments`, appointmentData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// get received appointments
export const getReceivedAnointments = async (id: string) => {
  try {
    const data = await apiCall.GET(`${SERVER_URL}/appointments/provider/${id}`).then((res) => {
      return res;
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

// get sent appointments
export const getSentAnointments = async (id: string) => {
  try {
    const data = await apiCall.GET(`${SERVER_URL}/appointments/user/${id}`).then((res) => {
      return res;
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

// get appointment by appointment id

export const getAppointmentById = async (id: string) => {
  try {
    return await apiCall.GET(`${SERVER_URL}/appointments/${id}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

// update user profile
export const updateUserProfile = async (id: string, data: {}) => {
  try {
    const res = await apiCall.PUT(`${SERVER_URL}/users/update/${id}`, data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const signUpAServiceProvider = async (id: string, userData: UpdateUser) => {
  try {
    return await apiCall.PUT(`${SERVER_URL}/users/create?user_id=${id}`, userData);
  } catch (error: any) {
    throw new Error(error);
  }
};
