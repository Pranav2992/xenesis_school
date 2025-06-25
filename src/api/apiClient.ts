import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { navigate } from '../navigation/RootNavigation';
import { removeSession, getSchoolName } from '../storage';

const apiClient = axios.create({
    baseURL: `https://${getSchoolName()?.trim()}`, // Set your base URL here
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Check internet connectivity
apiClient.interceptors.request.use(
    async config => {
        const state = await NetInfo.fetch();
        // console.log('state = ', state)
        if (!state.isConnected) {
            //console.log('not connected')
            return Promise.reject({
                message: 'No internet connection',
                isNetworkError: true,
            });
        }
        // Log the full request URL
        console.log('Request URL:', config.baseURL + "" + config.url);
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor: Handle Odoo session expiration
apiClient.interceptors.response.use(
    response => {
        //console.log('Response:', response);
        return response;
    },
    error => {
        //  console.log('Error:', error);
        if (
            error?.response?.data?.error?.code === 100 &&
            error?.response?.data?.error?.message === 'Odoo Session Expired'
        ) {
            removeSession();
            // Redirect to login screen
            navigate('Login');
        }
        return Promise.reject(error);
    }
);

export default apiClient; 