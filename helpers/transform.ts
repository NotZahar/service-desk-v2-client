export const ifEmptyToNull = (value: string | undefined) => {
    return value ? value : null;
};

export const toStringArray = (data: any): string[] => {
    if (Array.isArray(data) && data.every((v) => { return typeof v === 'string' })) {
        return data;
    } else if ('message' in data) {
        return [ data.message ]
    }

    return [ '' ];
}; 