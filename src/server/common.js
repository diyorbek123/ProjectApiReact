import { httpRequest } from "./config";

export const getData = (url) => {
    const config = {
        method: "GET",
        url
    };
    return httpRequest(config)
}
