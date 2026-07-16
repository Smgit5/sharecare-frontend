export interface AuthModel {}

export interface LoginRequest{
    username: string,
    password: string
}

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
}

export interface UserRegisterRequest {
    username: string;
    password: string;
    email: string;
}

export interface RefreshTokenRequest {
    token: string;
}