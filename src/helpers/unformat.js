export const unformat = (value) => {

    if (typeof value === 'number' && !isNaN(value)) {
        return value;
    }

    if (value.endsWith('%')) {
        value = value.replace('%', '');
        value = parseFloat(value);
        return value / 100;
    }

    if (value.startsWith('$')) {
        value = value.replace('$', '');
        value = value.replace(/,/g, '')
        value = parseFloat(value);
        return value;

    }
}