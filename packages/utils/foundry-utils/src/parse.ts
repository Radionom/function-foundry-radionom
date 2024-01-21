import { DefinitionProps, FunctionRef } from './factory.js'

export const validateTool = (toolInstance: any) => {
    if (!toolInstance) {
        throw new Error('Tool instance is undefined')
    }

    const attributes = Object.getOwnPropertyNames(toolInstance)
    const functions = attributes
        .filter(
            // @ts-ignore
    