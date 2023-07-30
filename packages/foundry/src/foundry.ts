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
            } else if (Array.isArray(entity)) {
                console.log({
                    entity,
                })
                for (const el of entity) {
                    if (typeof el === 'function') {
                        if (!validateFunction(el as FunctionRef)) {
                            throw new Error('Invalid function')
                        }
                    }
                }

                const parsedFunctions = parseToolFunctions(entity)
                this.flatFunctions.push(...parsedFunctions)
            } else {
                if (!validateTool(entity)) {
                    throw new Error('Invalid tool')
                }

                const parsedFunctions = parseToolFunctions(entity)
                this.flatFunctions.push(...parsedFunctions)
            }
        }
    }

    public getFunction(fullName: string) {
        const func = this.flatFunctions.find((el) => el.fullName === fullName)
        if (!func) {
            throw new Error(`Function ${fullName} not found.`)
        }
        return func
    }

    publ