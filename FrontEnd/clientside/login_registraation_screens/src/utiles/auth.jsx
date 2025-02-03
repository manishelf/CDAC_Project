import { jwtDecode } from "jwt-decode";

export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const { exp } = jwtDecode(token); 
        return Date.now() < exp * 1000; 
    }
    return false;
};
