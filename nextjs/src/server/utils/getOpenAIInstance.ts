import { env } from "app/env";
import OpenAI from "openai";

let openAI: OpenAI | null = null;

function getOpenAIInstance() {
    if (!openAI) {
        openAI = new OpenAI({
            apiKey: env.OPEN_AI_API_KEY,
        });

        return openAI;
    }

    return openAI;
}

export default getOpenAIInstance;