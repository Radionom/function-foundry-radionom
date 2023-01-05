<p align="center">
  <a href="https://docs.withfoundry.org">
  
  <picture>
    <source height="125" media="(prefers-color-scheme: dark)" srcset="./docs/logo/dark.svg">
    <img height="125" alt="Foundry" src="./docs/logo/light.svg">
  </picture>
</a>
</p>

<h4 align="center">A collection of tools and functions that can be used in conjunction with LLMs.</h4>

<p align="center">
  <a href="https://docs.usefoundry.io">Documentation</a> •
  <a href="https://docs.usefoundry.io/quickstart">Quickstart</a> • 
  <a href="https://docs.usefoundry.io/tools">Tool Collection</a> • 
  <a href="https://docs.usefoundry.io/contributing">Contribute</a> •
  <a href="https://discord.gg/xsZfmakRhw">Discord</a>

</p>

<hr/>

## About

As we wanted to get the Foundry framework up and running as quickly as possible, the range of tools is limited for the time being. But we're working on many more tools, and we believe in the power of collective effort - so we invite _you_ to contribute!

If you develop custom tools for use with LLMs, please consider contributing them to the Foundry library. As the number of tools in Foundry grows, its reach expands, leading to the creation of even more tools, and so on.

## Documentation

This README features a quick overview – for a detailed documentation, go to [docs.usefoundry.io](https://docs.usefoundry.io).

## Quickstart

#### Install the Foundry base package

```bash
npm install @usefoundry/foundry
```

#### Install the Tools you want to use, e.g.

```bash
npm install @usefoundry/tools-api-weather-api @usefoundry/tools-file-csv
```

## Foundry's Workflow

1. You define the tools you want to use using a new instance of `Foundry`

```typescript
import { Foundry, pickFromTool } from '@usefoundry/foundry'
import { Configuration, OpenAIApi } from 'openai'

import WeatherApiTool from '@usefoundry/tools-api-weather-api'
import CsvTool from '@usefoundry/tools-file-csv'

// Create a foundry instance with the tools we want to use
const foundry = new Foundry({
    tools: [
        new WeatherApiTool({
            apiKey: process.env.WEATHER_API_KEY!,
        }),
        new CalculatorTool(),
        pickFromTool(new CsvTool(), ['writeCsvFileSync']),
    ],
})
```

<details>
<summary>2. Foundry will convert the function declaration of each function of the selected tools into a JSON schema LLMs can understand</summary>

```typescript
const functions = foundry.getPreparedFunctions({ target: 'openai' })
/*
[
  {
    "name": "WeatherApiTool__getFutureWeatherForCityAtDate",
    "description": "Gets the weather forecast for a city at a specific date, starting 14 days in the future. So for getting the weather for a day within the next 14 days, use the getNearFutureWeatherForCity function.",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string"
        },
        "date": {
          "type": "string",
          "description": "Date in YYYY-MM-DD format"
        }
      },
      "required": [
        "city",
        "date"
      ],
      "additionalProperties": false,
      "d