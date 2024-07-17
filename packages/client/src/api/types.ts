import type { APIResponseData, APIResponseCollectionMetadata } from './strapi-types';

export type StrapiError = { status: number; name: string; message: string; details: unknown };

export type StrapiProject = APIResponseData<'api::project.project'>;
export type StrapiProjectItem = APIResponseData<'api::project-item.project-item'>;
export type StrapiAbout = APIResponseData<'api::about.about'>;
export type StrapiImage = StrapiProject['attributes']['coverImage'];

export type CollectionMetaData = APIResponseCollectionMetadata;

export type StrapiPath = 'projects' | 'project-items' | 'about';

type StrapiProjectAttrKey = keyof StrapiProject['attributes'];
type StrapiProjectItemAttrKey = keyof StrapiProjectItem['attributes'];
export type StrapiFilterParamKey = `filters[${StrapiProjectAttrKey | StrapiProjectItemAttrKey}]`;

type StrapiParamKey = 'populate' | StrapiFilterParamKey | 'sort';
export type StrapiParams = Partial<Record<StrapiParamKey, string>>;

export interface Connection {
  sendGetRequest<T>(apiPath: [StrapiPath, ...string[]], params?: Partial<Record<StrapiParamKey, string>>): Promise<T>;
}
