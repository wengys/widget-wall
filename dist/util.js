export function firstOrNull(array, filter) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (filter(element)) {
            return element;
        }
    }
    return null;
}
//# sourceMappingURL=util.js.map