import { ReactNode, useMemo } from 'react';
import { createApi, APIContext } from '../data-api';
import { FakeConnection } from './fake-connection';
import { FakeDataSettings } from './fake-data';

export function FakeAPIContextProvider(props: { settings?: FakeDataSettings; children: ReactNode }) {
  const api = useMemo(() => {
    const connection = new FakeConnection(props.settings);
    return createApi(connection);
  }, [props.settings]);
  return <APIContext.Provider value={api}>{props.children}</APIContext.Provider>;
}
