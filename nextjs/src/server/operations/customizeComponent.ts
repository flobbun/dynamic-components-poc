import { Api, HTTPVerbs } from 'app/lib/Api';
import { ApiPaths, CustomizeComponentRequestBody, CustomizeComponentResponse } from 'app/types';

export async function customizeComponent(params: CustomizeComponentRequestBody) {
    if (!params) return null;
    try {
        return Api<CustomizeComponentRequestBody, CustomizeComponentResponse>({
            method: HTTPVerbs.PUT,
            url: `${ApiPaths.DynamicComponents}`,
            data: params,
            cache: 'no-store',
            tags: ['customize-component'],
        });
    } catch (error) {
        console.error(error);
    }
}