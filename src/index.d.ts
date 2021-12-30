import {
  Body as NodeBody,
  Headers as NodeHeaders,
  Request as NodeRequest,
  Response as NodeResponse,
  RequestInit as NodeRequestInit
} from "node-fetch";

declare namespace unfetch {
  export type IsomorphicHeaders = Headers | NodeHeaders;
  export type IsomorphicBody = Body | NodeBody;
  export type IsomorphicResponse = Response | NodeResponse;
  export type IsomorphicRequest = Request | NodeRequest;
  export type IsomorphicRequestInit = RequestInit | NodeRequestInit;
}

type UnfetchResponse<T = any> = {
	ok: boolean,
	statusText: string,
	status: number,
	url: string,
	text: () => Promise<string>,
	json: () => Promise<T>,
	blob: () => Promise<Blob>,
	clone: () => UnfetchResponse,
	headers: {
		keys: () => string[],
		entries: () => Array<[string, string]>,
		get: (key: string) => string | undefined,
		has: (key: string) => boolean,
	}
}

type Unfetch<T> = (
	url: string,
	options?: {
		method?: string,
		headers?: Record<string, string>,
		credentials?: 'include' | 'omit',
		body?: Parameters<XMLHttpRequest["send"]>[0]
	}
) => Promise<UnfetchResponse<T>>

declare const unfetch: Unfetch;

export default unfetch;
