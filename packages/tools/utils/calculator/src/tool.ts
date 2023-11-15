import { makeFunction } from '@usefoundry/utils'
import { z } from 'zod'
import { evaluate } from 'mathjs'

export class CalculatorTool {
    constructor() {}

    public calculate = makeFunction(
        z
            .object({
                expression: z.string().describe('The mathematical expression to evaluate'),
            })
            .des