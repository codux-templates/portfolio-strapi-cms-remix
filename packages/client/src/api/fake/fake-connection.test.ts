import { describe, it, expect } from 'vitest';
import { FakeConnection } from './fake-connection';
import { APIResponse, APIResponseCollection } from '../strapi-types';

describe('FakeConnection sendGetRequest', () => {
    it('should fetch a collection', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });
        const expectedData = globalThis.FAKE_DATA.projects;

        const response = await connection.sendGetRequest<
            APIResponseCollection<'api::project.project'>
        >(['projects']);

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(expectedData));
        expect(response.data).not.toBe(expectedData);
    });

    it('should fetch filtered project items by project', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });
        const expectedData = globalThis.FAKE_DATA['project-items'].filter(
            (it) => it.attributes.project === '1',
        );

        const response = await connection.sendGetRequest<
            APIResponseCollection<'api::project-item.project-item'>
        >(['project-items'], {
            'filters[project]': '1',
        });

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(expectedData));
        expect(response.data).not.toBe(expectedData);
    });

    it('should fetch items by some filter', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });
        const item = globalThis.FAKE_DATA['projects'][1];
        const expectedData = [item];

        const response = await connection.sendGetRequest<
            APIResponseCollection<'api::project.project'>
        >(['projects'], {
            'filters[title]': item.attributes.title,
        });

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(expectedData));
        expect(response.data).not.toBe(expectedData);
    });

    it('should fetch single item from collection', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });
        const expectedData = globalThis.FAKE_DATA['projects'][1];

        const response = await connection.sendGetRequest<APIResponse<'api::project.project'>>([
            'projects',
            expectedData.id.toString(),
        ]);

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(expectedData));
        expect(response.data).not.toBe(expectedData);
    });

    it('should throw error for non existing item', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });

        const err = expect.objectContaining({ status: 404 });
        await expect(
            async () =>
                await connection.sendGetRequest<APIResponse<'api::project.project'>>([
                    'projects',
                    '5',
                ]),
        ).rejects.toThrow(expect.objectContaining({ data: null, error: err }) as Error);
    });

    it('should fetch item from single item entry', async () => {
        const connection = new FakeConnection({ numberOfItems: 2 });
        const expectedData = globalThis.FAKE_DATA.about;

        const response = await connection.sendGetRequest<APIResponse<'api::about.about'>>([
            'about',
        ]);

        expect(JSON.stringify(response.data)).to.equal(JSON.stringify(expectedData));
        expect(response.data).not.toBe(expectedData);
    });
});
