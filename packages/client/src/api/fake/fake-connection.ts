import { Connection, StrapiFilterParamKey, StrapiParams, StrapiPath } from '../types';
import { FakeData, FakeDataSettings, fake404, fakePaginationMeta, getFakeData } from './fake-data';

export class FakeConnection implements Connection {
    data: FakeData;
    constructor(setting?: FakeDataSettings) {
        this.data = getFakeData(setting);
    }

    sendGetRequest<T>(apiPath: [StrapiPath, ...string[]], params?: StrapiParams) {
        if (apiPath.length === 0 || apiPath.length > 2) {
            throw new Error('path has to have at least one segment and no more than 2');
        }
        const dataEntryKey = apiPath[0];
        const dataEntry = this.data[dataEntryKey];

        let response = null;
        if (Array.isArray(dataEntry)) {
            response = getItemsFromCollection(dataEntry, apiPath, params);
        } else {
            response = { data: cloneDeep(dataEntry), meta: {} };
        }

        if (response) {
            return Promise.resolve(response as T);
        }

        return Promise.reject({
            data: null,
            error: cloneDeep(fake404),
        });
    }
}
type Collection = { id: number; attributes: { [key: string]: unknown } }[];
function getItemsFromCollection(
    collection: Collection,
    apiPath: [StrapiPath, ...string[]],
    params?: StrapiParams,
) {
    const isSingleItem = apiPath.length === 2;
    const filterParamKey = params
        ? (Object.keys(params).find((key) => key.startsWith('filters')) as StrapiFilterParamKey)
        : null;

    if (isSingleItem) {
        return getSingleItemFromCollection(collection, apiPath[1]);
    }
    if (filterParamKey && params) {
        return getFilteredItemsFromCollection(collection, params, filterParamKey);
    }
    return { data: cloneDeep(collection), meta: cloneDeep(fakePaginationMeta) };
}

function getSingleItemFromCollection(collection: Collection, itemId: string) {
    const id = parseInt(itemId);
    const item = collection.find((it) => it.id === id);

    return item ? { data: cloneDeep(item), meta: {} } : null;
}

function getFilteredItemsFromCollection(
    collection: Collection,
    params: StrapiParams,
    filterKey: StrapiFilterParamKey,
) {
    const filterValue = params[filterKey];
    const filterBy = filterKey.split('[')[1].replace(']', '');

    return {
        data: collection.filter((it) => it.attributes[filterBy] === filterValue),
        meta: cloneDeep(fakePaginationMeta),
    };
}

function cloneDeep<T>(serializableObject: T) {
    return JSON.parse(JSON.stringify(serializableObject)) as T;
}
