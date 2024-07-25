import { Connection, StrapiImage } from './types';

function buildUrl(apiName: string, params?: Record<string, string>) {
    const searchParams = new URLSearchParams(params);
    return `${import.meta.env.VITE_API || process.env.VITE_API}${apiName}?${searchParams.toString()}`;
}

/**
 * wrapps the fetch to Strapi calls.
 * we have this wrapper for 2 reasons:
 * 1. so we don't have to duplicate code (like parsing strings to dates)
 * 2. so we can easily mock the fetch and return fake data, or replace the fetch with anything else
 */
export class StrapiConnection implements Connection {
    async sendGetRequest<T>(apiPath: string[], params?: { [key: string]: string }) {
        try {
            const res = await fetch(buildUrl(apiPath.join('/'), params), {
                method: 'GET',
            });
            if (res.ok) {
                const json = await res.text();
                return JSON.parse(json) as T;
            }
            throw res.json();
        } catch (e) {
            console.log;
            throw e;
        }
    }
}

export function getImageUrl(image: StrapiImage | undefined) {
    if (!image || !image.data) {
        return undefined;
    }
    const provider = image.data.attributes.provider;
    if (provider === 'strapi-provider-upload-strapi-cloud') {
        return image.data.attributes.url;
    }
    if (provider === 'local') {
        return `${import.meta.env.VITE_MEDIA || process.env.VITE_MEDIA}${image?.data.attributes.url}`;
    }
    if (provider === 'faker') {
        return image?.data.attributes.url;
    }
    throw new Error(`image provider ${provider} not implemented`);
}
