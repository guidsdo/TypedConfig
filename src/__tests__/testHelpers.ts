export class ExampleClass {
    propertyDefaultNull: string = null as any;
    propertyDefaultEmptyString: string = "";
    propertyDefaultUndefined!: boolean;

    propertyDefault0: number = 0;
    propertyDefaultHelloWorld: string = "HelloWorld";
    propertyDefaultAge: number = 17;

    propertyObject!: ExampleClass;
}

export class ExtraExampleClass {
    propertyDefaultFooBar: string = "FooBar";
}

/**
 * Removes all fields and metadata from the given class.
 */
export function removeConfigMetadata(clazz: Function) {
    const classPrototype = clazz.prototype;

    for (const symbol of Object.getOwnPropertySymbols(classPrototype)) {
        delete classPrototype[symbol];
    }

    for (const property of Object.getOwnPropertyNames(classPrototype)) {
        // Obviously we don't want to delete the constructor
        if (property === "constructor") continue;

        delete classPrototype[property];
    }
}
