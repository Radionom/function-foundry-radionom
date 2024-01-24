import { DefinitionProps, FunctionRef } from './factory.js'

export const validateTool = (toolInstance: any) => {
    if (!toolInstance) {
        throw new Error('Tool instance is undefined')
    }

    const attributes = Object.getOwnPropertyNames(toolInstance)
    const functions = attributes
        .filter(
            // @ts-ignore
            (name) => typeof toolInstance[name] === 'function' && name
        )
        .filter((name) => name !== 'constructor' && name !== 'apiClient')
        .map((name) => ({
            name: name,
            // @ts-ignore
            func: toolInstance[name],
        }))

    for (const el of functions) {
        validateFunction(el.func)
    }
    return true
}

export const validateFunction = (func: FunctionRef) => {
    const definition = func.prototype.getDefinition()

    if (!definition) {
        throw new Error(`Function ${func.name} does not have a definition.`)
    }

    if (!definition.schema) {
        throw new Error