"use server";

export type FETCH_METHODS = "POST" | "GET" | "DELETE" | "PATCH" | "PUT";

interface FetchArguments<BodyType> {
  url: string;
  method: FETCH_METHODS;
  body?: BodyType;
  nextOptions?:
    | (Omit<NextFetchRequestConfig, "tags"> & {
        tags?: ""[];
      })
    | undefined;
  headers?: { [index: string]: string };
  cache?: RequestCache;
}

export default async function fetcher<ResponseType, BodyType = {}>(
  fetcherArgs: FetchArguments<BodyType>
): Promise<ResponseType> {
  try {
    const response = await fetch(fetcherArgs.url, {
      method: fetcherArgs.method,
      body: JSON.stringify(fetcherArgs.body),
      headers: fetcherArgs.headers,
      next: fetcherArgs.nextOptions,
      cache: fetcherArgs.cache,
    });

    if (!response.ok) {
      console.log("error while fetching data");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
