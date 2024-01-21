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
     