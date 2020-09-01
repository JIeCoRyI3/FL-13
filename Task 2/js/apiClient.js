let apiClientInstance = null;

export default class ApiClient {

    constructor() {
        apiClientInstance = apiClientInstance || this;
        return apiClientInstance;
    }
    _apiBase = 'http://localhost:3000';

    globalConnectFunction = async (url, data = null, headers, method, jsonNeed = false) => {
        const res = await fetch(`${this._apiBase}${url}`,
            {
                method,
                body: data ? JSON.stringify(data) : null,
                headers,
            });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        if (jsonNeed) {
            return await res.json();
        }
        return await res;
    };

    getListOfPosts = async () => {
        return await this.globalConnectFunction(`/api/list/`,
            null,
            { 'Authorization':'Bearer somekey' },
            'GET',
            true);
    };

    getPostById = async (id) => {
        return await this.globalConnectFunction(`/api/list/${id}/`,
            null,
            { 'Authorization':'Bearer somekey' },
            'GET',
            true);
    };

    createPost = async (obj) => {
        return await this.globalConnectFunction(`/api/create-article/`,
                obj,
            { "Content-Type": "application/json" },
            'POST',
            false);
    };
}



