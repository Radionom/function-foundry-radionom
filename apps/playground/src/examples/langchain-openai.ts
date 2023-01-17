import { Foundry, pickFromTool } from '@usefoundry/foundry'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { SystemChatMessage, HumanChatMessage, AIChatMessage } from 'langchain/schema'

import WeatherApiTool from '@usefoundry/tools-api-weather-api'
import CsvTool from '@usefoundry/tools-file-csv'

const foundry = new Foundry({
    tools: [
        new WeatherApiTool({
            apiKey: process.env.WEATHER_API_KEY!,
        }),
        pickFromTool(new CsvTool(), [
            'writeCsvFileSync',
            'getCsvFileColumnsSync',
            'appendToCsvFileSync',
        ]),
    ],
})

const predictFunction = async (
    messages: (SystemChatMessage | HumanChatMessage | AIChatMessage)[],
    llm: Chat