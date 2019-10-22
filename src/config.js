let BASE_URL, SECOND_URL, SOCKET_BASE_URL;

if(window.location.host === 'localhost:3000') {
    BASE_URL = 'https://api.gaming-stars.4-com.pro/api/v0';
} else if (window.location.host === "mining-hotel.4-com.pro") {
    BASE_URL = 'https://api.gaming-stars.4-com.pro/api/v0';
} else{
    BASE_URL = 'https://api.gaming-stars.4-com.pro/api/v0';
}

SOCKET_BASE_URL = 'api.gaming-stars.4-com.pro/api/v0';
SECOND_URL = '';
export const API_BASE_URL = BASE_URL;
export const API_SECOND_URL = SECOND_URL;
export const API_SOCKET_BASE_URL = SOCKET_BASE_URL;
