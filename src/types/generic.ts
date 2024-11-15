// GenericDto wrapper type
export interface GenericDtoBody<T> {
    requestId?: string;
    message?: string;
    code?: string;
    data: T;
}

// GenericDto wrapper type
export interface GenericDtoResult<T> {
    requestId?: string;
    message?: string;
    code?: string;
    data?: T & { roles: string[]; token: string };
    role?: string[];
    token?: string;
}

export interface RequestDto<T> {
    request: T;
}

export interface RespondDto<T> {
    httpStatusName: string;
    httpStatusCode: string;
    errorMessage: string;
    message: string;
    data: T;
}
