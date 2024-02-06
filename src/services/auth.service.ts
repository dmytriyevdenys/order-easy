import { TSignIn } from "interfaces/auth/sign-in.type";
import { TUser } from "interfaces/user/user.type";
import { api } from "./api/axiosConfig";

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
}

export const authService = new AuthService();