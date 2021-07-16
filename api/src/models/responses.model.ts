export interface Response {
    status: string;
    body?: unknown;
    headers?: unknown;
}

export interface ErrorResponse extends Response {
    status: '400' | '404' | '500'
    body: {
        errorCode: string;
        message: string;
    }
}

export interface CreateResponse extends Response {
    status: '201';
    body?: never;
}

export interface ListResponse extends Response {
    status: '200';
    body?: unknown[];
}

export interface UpdateResponse extends Response {
    status: '201';
    body?: never;
}

export interface GetResponse extends Response {
    status: '200';
    body?: unknown;
}

export interface DeleteResponse extends Response {
    status: '200';
    body?: unknown;
}
