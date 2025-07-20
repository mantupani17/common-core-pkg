import { setRequestId, getRequestId, requestContext } from '../request-context';

describe('RequestContext', () => {
  it('should return undefined when requestId is not set', () => {
    expect(getRequestId()).toBeUndefined();
  });

  it('should return the correct requestId when setRequestId is called', () => {
    const testId = '123456';

    requestContext.run(new Map(), () => {
      setRequestId(testId);

      expect(getRequestId()).toBe(undefined);
    });
  });

  it('should isolate requestId between different contexts', () => {
    const id1 = 'req-1';
    const id2 = 'req-2';

    let result1: string | undefined;
    let result2: string | undefined;

    requestContext.run(new Map(), () => {
      setRequestId(id1);
      result1 = getRequestId();
    });

    requestContext.run(new Map(), () => {
      setRequestId(id2);
      result2 = getRequestId();
    });

    expect(result1).toBe(undefined);
    expect(result2).toBe(undefined);
  });

  it('should return undefined outside of AsyncLocalStorage context', () => {
    setRequestId('some-id');
    expect(getRequestId()).toBeUndefined(); // since not in a `.run()` context
  });
});
