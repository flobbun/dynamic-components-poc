import { Api, HTTPVerbs } from 'app/lib/Api';
import { ApiPaths, PatchDynamicComponentsRequestBody, PatchDynamicComponentsResponse } from 'app/types';

export async function patchDynamicComponents(params: PatchDynamicComponentsRequestBody) {
    if (!params) return null;
    try {
        return Api<PatchDynamicComponentsRequestBody, PatchDynamicComponentsResponse>({
            method: HTTPVerbs.PATCH,
            url: `${ApiPaths.DynamicComponents}`,
            data: params,
            cache: 'no-store',
            tags: ['customize-component'],
        });
    } catch (error) {
        console.error(error);
    }
}