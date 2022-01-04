type FunctionDict = {
  [key: string]: (...args: any[]) => Promise<any>;
};

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

async function all<T extends FunctionDict>(
  iterable: T
): Promise<{ [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> }> {
  const iterablePromises = Object.entries(iterable).reduce((accum, [key, value]) => {
    if (Object.hasOwnProperty.call(iterable, key)) {
      accum.push(value());
    }

    return accum;
  }, [] as Promise<any>[]);

  const resolvedValues = await Promise.all(iterablePromises);

  const iterableKeys: Array<keyof typeof iterable> = Object.keys(iterable);

  return iterableKeys.reduce((accum, key) => {
    if (Object.hasOwnProperty.call(iterable, key)) {
      accum[key] = resolvedValues.shift();
    }

    return accum;
  }, {} as { [K in keyof T]: UnwrapPromise<ReturnType<T[K]>> });
}

export { all };
