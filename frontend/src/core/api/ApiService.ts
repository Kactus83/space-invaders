import axios, { AxiosInstance } from 'axios';

class ApiService {
    private static instance: ApiService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000/', // URL de ton API
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.axiosInstance.interceptors.response.use((response: any) => response, (error: any) => {
            // Gestion centralisée des erreurs
            console.error('API Error:', error);
            return Promise.reject(error);
        });
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public get(path: string) {
        return this.axiosInstance.get(path);
    }

    public post(path: string, data: any) {
        return this.axiosInstance.post(path, data);
    }

    public delete(path: string) {
        return this.axiosInstance.delete(path);
    }
}

export default ApiService;