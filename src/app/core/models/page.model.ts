import { ErrorCode } from "../../constants/error-response";

export interface PageResponse<T> {
    content: T[];
    page: number;
    size: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    lastPage: boolean;
}

export interface ApiResponse {
    status: number;
    code: ErrorCode;
    message: string;
}
