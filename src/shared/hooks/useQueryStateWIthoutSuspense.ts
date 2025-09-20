import { useQueryState, UseQueryStateOptions } from "nuqs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQueryStateWithoutSuspense = ((key: string, options: UseQueryStateOptions<any>) => {
  try {
    return useQueryState(key, options);
  } catch (err) {
    if (String(err).includes(`Bail out to client-side rendering: useSearchParams()`)) {
      return [null, () => {}] as never;
    }
    throw err;
  }
}) as typeof useQueryState;
