export interface APIError {
    message: string;
    statusCode: number;
    method?: string;
    path?: string;
    timestamp?: string;
    level?: string;
}
