export function firstOrNull<T>(array: Array<T>, filter: (item: T) => Boolean) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(filter(element)) {
            return element
        }
    }
    return null
}