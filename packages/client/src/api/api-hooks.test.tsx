import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProjects, useProject } from './api-hooks';
import { FakeAPIContextProvider } from './fake/fake-provider';
import { ReactNode } from 'react';
import { SWRConfig, Cache } from 'swr';

function Wrapper(props: { swrCache?: Cache<object>; children: ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => props.swrCache || new Map() }}>
      <FakeAPIContextProvider>{props.children}</FakeAPIContextProvider>
    </SWRConfig>
  );
}

describe('api hooks', () => {
  it('should fetch all items', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper: Wrapper });
    await waitFor(() => !!result.current.data, { timeout: 100 });

    expect(result.current.data?.data.length).toBe(10);
  });

  it('should fetch single item', async () => {
    const { result } = renderHook(() => useProject(1), { wrapper: Wrapper });
    await waitFor(() => !!result.current.data, { timeout: 100 });

    expect(result.current.data?.id).toBe(1);
  });

  it('should not fetch item if previously loaded by useItems', async () => {
    //we need to init the cache here, so we can use the same cache in both renders
    const swrCache = new Map();
    //use all items - will fetch all items
    const { result } = renderHook(() => useProjects(), {
      wrapper: (props) => Wrapper({ children: props.children, swrCache }),
    });
    await waitFor(() => !!result.current.data, { timeout: 100 });

    const itemTitleInList = result.current.data?.data.find((it) => it.id === 1)?.attributes.title;

    //use single item - item should be already in cache
    const { result: resultItem } = renderHook(() => useProject(1), {
      wrapper: (props) => Wrapper({ children: props.children, swrCache }),
    });
    await waitFor(() => !!resultItem.current.data, { timeout: 100 });

    const itemTitle = resultItem.current.data?.attributes.title;

    expect(itemTitle).toBe(itemTitleInList);
  });
});
