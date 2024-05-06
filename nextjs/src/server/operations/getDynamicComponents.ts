import { Api, HTTPVerbs } from 'app/lib/Api';
import { ApiPaths, GetDynamicComponentsResponse } from 'app/types';

export async function getDynamicComponents() {
    try {
        return Api<void, GetDynamicComponentsResponse>({
            method: HTTPVerbs.GET,
            url: `${ApiPaths.DynamicComponents}`,
            cache: 'no-store',
            tags: ['dynamic-components'],
        });
    } catch (error) {
        console.error(error);
    }
}