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
    return apiCall.POST(SERVER_URL + '/users/signup', newUser);
};

type LoginType = {
    email: string;
    password: string;
};

// LOGIN
export const LOGIN = (returningUser: LoginType) => {
    // console.log(returningUser);
    return apiCall.POST(SERVER_URL + '/users/login', returningUser);
};

// Get user by ID
export const getUserById = (id: string)=>{
    return apiCall.GET(`${SERVER_URL}/users/${id}`)
}

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
export const deleteService = (service_id: string): any => {
    try {
        return apiCall.DELETE(SERVER_URL + `/products/${service_id}`);
    } catch (error: any) {
        console.log(error);
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

// UPDATE PRODRUCT
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
): Promise<CurrentLoacation | undefined> => {
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
export const creatApointment = async (aptmData: {}) => {
    try {
        const data = await apiCall.POST(`${SERVER_URL}/appointments`, aptmData);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

// get providers appointments

export const getProvidersApointments = async (id: string) => {
    try {
        const data = await apiCall.GET(`${SERVER_URL}/appointments/provider/${id}`).then((res) => {
            return res;
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};
