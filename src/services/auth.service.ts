import { TSignIn } from "types/auth/sign-in.type";
import { TUser } from "types/user/user.type";
import { api } from "../config/api/axiosConfig";
import { TRole } from "types/auth/role.type";
import { ApiResponse } from '../types/api-response.interface';

class AuthService { 
    private authPath = 'auth';

    async login({email, password}: TSignIn) {      
        const token = await api.post<{access_token: string, isAuth: boolean}>(`${this.authPath}/login`, {email, password});
        return token.data;
    }

    async registration () {}

    async authMe () {
      const me = await api.get<TUser>(`${this.authPath}/me`);
      return me.data;
    }
    async refresh (access_token: string) {
      const response = await api.post<{access_token: string}>(`${this.authPath}/refresh`, access_token);
      return response.data.access_token;
    }

    async getRoles () {
      const roles = await api.get<ApiResponse<TRole[]>>('role');
      return roles.data;
    }
}

export const authService = new AuthService();