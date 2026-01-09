const ALLOWED_FIELDS = ['dailyLimit', 'codeforcesId'];

export const getUpdatedFields = (value: Record<string, number | string>) => {
    const updatedFields : Record<string, number | string> = {};

    for (const key of ALLOWED_FIELDS) {
        if (value[key] !== undefined) {
            updatedFields[key] = value[key];
        }
    }

    return updatedFields;
}