import { Api, HTTPVerbs } from "app/lib/Api";
import { ApiPaths, AskForCSSRequestBody, AskForCSSResponse } from "app/types";

export async function askForCSS({ prompt }: AskForCSSRequestBody) {
    if (!prompt) return null;
    try {
        return Api<AskForCSSRequestBody, AskForCSSResponse>({
            method: HTTPVerbs.GET,
            url: `${ApiPaths.Ask}?prompt=${prompt}`,
        });
    } catch (error) {
        console.error(error);
    }
}