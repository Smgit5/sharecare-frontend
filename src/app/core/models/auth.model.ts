export interface AuthModel {}

export interface LoginRequest{
    username: string,
    password: string
}

export interface AuthResponse{
    accessToken: string,
    refreshToken: string
}