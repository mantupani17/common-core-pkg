import { AsyncLocalStorage } from 'async_hooks';

export const requestContext = new AsyncLocalStorage<Map<string, any>>();

export function setRequestId(requestId: string) {
  const store = new Map<string, any>();
  store.set('requestId', requestId);
  requestContext.run(store, () => {});
}

export function getRequestId(): string | undefined {
  const store = requestContext.getStore();
  return store?.get('requestId');
}