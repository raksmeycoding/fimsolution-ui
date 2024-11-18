import {AuthRegisterRequest, GenericDtoBody,} from "../../types";

export const INIT_GENERIC_DTO_AUTH_REGISTER_REQUEST: GenericDtoBody<AuthRegisterRequest> =
    {
        requestId: "",
        message: "",
        code: "",
        data: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
        },
    };


