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
                if (!validate