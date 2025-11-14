import { ref, type Ref } from "vue";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useFetch<TResponse = unknown, TPayload = unknown>(url: string) {
  const data: Ref<TResponse | null> = ref(null);
  const error = ref<Error | null>(null);

  const fetchData = async (method: HttpMethod, body?: TPayload) => {
    try {
      const csrfToken =
        typeof document !== "undefined" ? document.getElementsByName("csrf-token")[0]?.getAttribute("content") ?? undefined : undefined;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {})
        },
        body: body ? JSON.stringify(body) : undefined
      });

      const json = (await response.json()) as TResponse;
      data.value = json;
      error.value = null;
      return json;
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error("Unknown request error");
      error.value = normalizedError;
      throw normalizedError;
    }
  };

  const get = () => fetchData("GET");
  const post = (payload?: TPayload) => fetchData("POST", payload);
  const put = (payload?: TPayload) => fetchData("PUT", payload);
  const del = () => fetchData("DELETE");

  return { data, error, get, post, put, del };
}
