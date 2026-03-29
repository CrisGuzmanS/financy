export const unformat = (value) => {
    if (value.endsWith('%')) {
        value = value.replace('%', '');
        value = parseFloat(value);
        return value / 100;
    }
}