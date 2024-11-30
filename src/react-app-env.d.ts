/// <reference types="react-scripts" />

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}


declare module 'animejs/lib/anime.es.js' {
    var anime: any;
    export = anime;
}

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_MODE: string;
        REACT_APP_API_ENDPOINT: string;
        REACT_APP_ACCESS_TOKEN_KEY: string;
        REACT_APP_API_ENDPOINT_DEV: string
    }
}


