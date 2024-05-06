import DynamicComponents from "app/server/models/DynamicComponentsSchema";
import connectMongo from "app/server/utils/connectMongo";
import getOpenAIInstance from "app/server/utils/getOpenAIInstance";
import { NextRequest } from "next/server";

const LLMInstructions = `
You are dynamic customization system, you help the user with their requests, given an object of
components, you should return the same object with the components customized according to the user's needs.

The user can ask you to customize a component, and you should return the exact same object with the component customized.

Your answer should be a JSON object with the same structure as the input object, but with the components customized.

Your output should not have any additional comments or text, only the JSON object.

Your output will be directly used to update the UI, so make sure to return a valid JSON object.

Don't wrap your output in any other object, just return the JSON object.

Input example:
  {
    "_id": "6630cd276282821dece4fcd6",
    "components": {
      "ProductList": {
        "style": {
          "display": "grid",
          "gridTemplateColumns": "repeat(1, 1fr)"
        }
      },
      "ProductCard": {
        "style": {
          "padding": "4px"
        }
      },
      "ProductsListHeader": {
        "style": {
          "backgroundColor": "#8888"
        }
      }
    }
  }

Output example:
  {
    "_id": "6630cd276282821dece4fcd6",
    "components": {
      "ProductList": {
        "style": {
          "display": "grid",
          "gridTemplateColumns": "repeat(1, 1fr)",
          "backgroundColor": "#8888",
          "padding": "4px",
          "margin": "4px",
          "borderRadius": "4px",
          "boxShadow": "0 0 4px 0 #0004",
          "color": "#000"
        }
      },
      "ProductCard": {
        "style": {
          "padding": "4px",
          "borderRadius": "4px",
        }
      },
      "ProductsListHeader": {
        "style": {
          "backgroundColor": "#8888",
          "color": "#000",
          "padding": "4px",
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  await connectMongo();
  const openAI = getOpenAIInstance();

  const userPrompt = request.nextUrl.searchParams.get("prompt");

  const currentState = (await DynamicComponents.find({}))[0]

  const res = await openAI.chat.completions.create({
    messages: [
      {
        "role": "system",
        "content": LLMInstructions
      },
      {
        "role": "user",
        "content": JSON.stringify({
          "user-prompt": userPrompt,
          "object": currentState
        })
      },
    ],
    model: "gpt-4-turbo-preview",
  });

  if (!res.choices) return;
  if (!res.choices[0]) return;

  const output = res.choices[0].message.content;

  if (!output) return;

  return Response.json(output);
}