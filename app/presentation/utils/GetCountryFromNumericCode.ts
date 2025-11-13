import countries from "i18n-iso-countries";

export const getCountryNameFromNumericCode = (numericCode: string | number, locale: string = 'en') => {
    const code = String(numericCode).padStart(3, '0');

    const entry = Object.entries(countries.getAlpha2Codes()).find(([alpha2]) => {
        const num = countries.alpha2ToNumeric(alpha2);
        return num === code;
    });

    if (entry) {
        const [alpha2] = entry;
        return countries.getName(alpha2, locale) || `Unknown (${numericCode})`;
    }

    return `Unknown code: ${numericCode}`;
}