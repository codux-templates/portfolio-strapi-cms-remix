import { ApiAboutAbout, ApiProjectItemProjectItem, ApiProjectProject } from '@portfolio/strapi';
import type { APIResponseCollectionMetadata } from './strapi-types';

export type StrapiError = { status: number; name: string; message: string; details: unknown };

export type StrapiProject = ApiProjectProject;
export type StrapiProjectItem = ApiProjectItemProjectItem;
export type StrapiAbout = ApiAboutAbout;
export type StrapiImage = StrapiProject['attributes']['coverImage'];

export type CollectionMetaData = APIResponseCollectionMetadata;

export type StrapiPath = 'projects' | 'project-items' | 'about';

type StrapiProjectAttrKey = keyof StrapiProject['attributes'];
type StrapiProjectItemAttrKey = keyof StrapiProjectItem['attributes'];
export type StrapiFilterParamKey = `filters[${StrapiProjectAttrKey | StrapiProjectItemAttrKey}]`;

type StrapiParamKey = 'populate' | StrapiFilterParamKey | 'sort';
export type StrapiParams = Partial<Record<StrapiParamKey, string>>;

export interface Connection {
    sendGetRequest<T>(
        apiPath: [StrapiPath, ...string[]],
        params?: Partial<Record<StrapiParamKey, string>>,
    ): Promise<T>;
}
