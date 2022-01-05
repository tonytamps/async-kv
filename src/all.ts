export async function all<T extends FunctionDict>(
    iterable: T
): Promise<{ [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> }> {
    const iterablePromises = Object.entries(iterable).reduce((accum, [key, value]) => {
        if (Object.hasOwnProperty.call(iterable, key)) {
            return [...accum, value()];
        }

        return accum;
    }, [] as ReturnType<T[keyof T]>[]);

    const resolvedValues = await Promise.all(iterablePromises);

    const iterableKeys: ReadonlyArray<keyof typeof iterable> = Object.keys(iterable);

    return iterableKeys.reduce((accum, key) => {
        if (Object.hasOwnProperty.call(iterable, key)) {
            return { ...accum, [key]: resolvedValues.shift() };
        }

        return accum;
    }, {} as { [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> });
}
