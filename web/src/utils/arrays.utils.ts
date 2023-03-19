
export const doesStrArrayIncludeStr = (arr: string[], str: string): boolean =>
    arr.some((item) => item.includes(str));