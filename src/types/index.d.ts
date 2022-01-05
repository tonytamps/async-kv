type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

type FunctionDict = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (...args: any[]) => any;
};
