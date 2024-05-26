function buildQueryString(params: Record<string, any>): string {
    if (params === undefined) return '';

    if (params.length === 0) return '';

    return (
        Object.keys(params)
            // FILTER OUT UNDEFINED VALUES AND EMPTY STRINGS
            .filter(function (key) {
                return params[key] !== undefined && params[key] !== null;
            })
            .map(function (key) {
                if (Array.isArray(params[key])) {
                    return (
                        encodeURIComponent(key) +
                        '=' +
                        encodeURIComponent(JSON.stringify(params[key]))
                    );
                }
                if (isObject(params[key])) {
                    return (
                        encodeURIComponent(key) +
                        '=' +
                        encodeURIComponent(JSON.stringify(params[key]))
                    );
                }
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            })
            .join('&')
    );
}

function isObject(value: null) {
    return value !== null && typeof value === 'object';
}

export default buildQueryString;
