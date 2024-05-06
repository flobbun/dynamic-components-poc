import { env } from "app/env";

export enum Exception {
    UNCAUGHT = "UNCAUGHT",
}

export enum HTTPVerbs {
    DELETE = "DELETE",
    GET = "GET",
    HEAD = "HEAD",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
    OPTIONS = "OPTIONS",
    PROPFIND = "PROPFIND",
    PROPPATCH = "PROPPATCH",
    MKCOL = "MKCOL",
    COPY = "COPY",
    MOVE = "MOVE",
    LOCK = "LOCK",
    UNLOCK = "UNLOCK",
    TRACE = "TRACE",
    SEARCH = "SEARCH",
}

export type HTTPVerb = keyof typeof HTTPVerbs;

interface Params<Data, Response> {
    method: HTTPVerb;
    url: string;
    baseUrl?: string;
    data?: Data;
    revalidate?: number | false;
    cache?: RequestCache;
    tags?: string[];
}
export function Api<Data, Response>(params: Params<Data, Response>) {
    return new Promise<Response>((resolve, reject) => {
        fetch(`${params?.baseUrl || env.NEXT_PUBLIC_API_URL}${params.url}`, {
            method: params.method,
            body: JSON.stringify(params.data),
            headers: {
                "Content-Type": "application/json",
            },
            cache: params.cache || "no-cache",
            next: {
                revalidate: params.revalidate,
                tags: params.tags,
            }
        },)
            .then((r) => {
                if (r.ok) {
                    return r.json();
                }
                throw new Error("UNCAUGHT");
            })
            .then((r) => {
                resolve(r);
            })
            .catch((e) => {
                reject(e);
            });
    });
}