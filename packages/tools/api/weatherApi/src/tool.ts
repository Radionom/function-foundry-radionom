import type { AxiosInstance } from 'axios'

import { makeFunction } from '@usefoundry/utils'
import { z } from 'zod'
import { createApi } from './api.js'

export class WeatherApiTool {
    public description = 'Tool to get weather data from weatherapi.com'

    private a