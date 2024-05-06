const assignObject = (target: Record<string, any>, source: Record<string, any>, property: string | number): unknown => {
    if (!source.hasOwnProperty(property))
        throw new Error(`Property ${property} not found in source object`);

    if (!target.hasOwnProperty(property))
        target[property] = {};

    return Object.assign(target[property], source[property]);
}

export default assignObject;