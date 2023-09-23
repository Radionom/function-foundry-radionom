import type { AxiosInstance } from 'axios'

import { makeFunction } from '@usefoundry/utils'
import { z } from 'zod'
import { createApi } from './api.js'

export class WeatherApiTool {
    public description = 'Tool to get weather data from weatherapi.com'

    private apiKey: string = ''
    private apiClient: AxiosInstance
    constructor({ apiKey }: { apiKey: string }) {
        this.apiKey = apiKey
        this.apiClient = createApi({ apiKey })
    }

    public getFutureWeatherForCityAtDate = makeFunction(
        z
            .object({
                city: z.string(),
                date: z.string().describe('Date in YYYY-MM-DD format'),
            })
            .describe(
                'Gets the weather forecast for a city at a specific date, starting 14 days in the future. So for getting the weather for a day within the next 14 days, use the getNearFutureWeatherForCity function.'
            ),
