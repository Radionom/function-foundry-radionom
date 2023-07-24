import {
    validateTool,
    parseToolFunctions,
    parseStandaloneFunction,
    FunctionRef,
    ParsedFunctionRef,
    validateFunction,
} from '@usefoundry/utils'

export class Foundry {
    private tools: object[] = []
    private flatFunctions: ParsedFunctionRef[] = []

    constructor({ tools }: { tools: (object | FunctionRef)[] }) {
        for (const entity of tools) {
            // if it's a function
            if (typeof entity === 'function') {
                if (!validateFunction(entity as FunctionRef)) {
                    throw new Error('Invalid function')
                }

                const parsedFunction = parseStandaloneFunction(entity as FunctionRef)
                this.flatFunctions.push(parsedFunction)
                // if it's an array
            } else if (Array