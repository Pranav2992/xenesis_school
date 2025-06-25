export type DatabaseListPayload = {
    jsonrpc: string | number;
    params: Record<string, any>;
}

export type LoginPayload = {
    jsonrpc: string;
    params: {
        db: string;
        login: string;
        password: string;
    }
}