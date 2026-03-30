export class Format{
    static money(value) {
        return '$' + value.toLocaleString('mx', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    static percentage(value) {
        return `${(value * 100).toFixed(2)}%`;
    }
}