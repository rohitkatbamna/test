import buildQueryString from './buildQueryString';
import getApiKey from './getApiKey';
import getBaseUrl from './getBaseUrl';

function fetchCall({
    endpoint,
    params = {},
    options = {},
}: {
    endpoint: string;
    params?: Record<string, any>;
    options?: RequestInit;
}): Promise<any> {
    return fetch(
        getBaseUrl() +
            endpoint +
            '?' +
            buildQueryString({
                api_key: getApiKey(),
                ...params,
            }),
        {
            method: options?.method ?? 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            body: options?.body ? JSON.stringify(options.body) : null,
        },
    )
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
            }
        })
        .catch((error: Error) => {
            console.error('Fetch error:', error);
            throw error;
        });
}

export default fetchCall;
