// src/tool.ts
import { makeFunction } from "@usefoundry/utils";
import { z } from "zod";
import crypto from "crypto";
var RandomTool = class {
  constructor() {
  }
  randomInteger = makeFunction(
    z.object({
      type: z.enum(["positive", "negative", "any"])
    }).describe("Generates a random integer number without specific boundaries"),
    async ({ type }) => {
      if (type === "positive") {
