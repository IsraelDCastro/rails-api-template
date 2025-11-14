import { useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useFetch<TResponse = unknown, TPayload = unknown>(url: string) {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (method: HttpMethod, body?: TPayload) => {
    try {
      const csrfToken =
        typeof document !== "undefined" ? document.getElementsByName("csrf-token")[0]?.getAttribute("content") : undefined;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          ...(csrfToken ? { "x-csrf-token": csrfToken } : {})
        },
        body: body ? JSON.stringify(body) : undefined
      });

      const json: TResponse = await response.json();
      setData(json);
      setError(null);
      return json;
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error("Unknown request error");
      setError(normalizedError);
      throw normalizedError;
    }
  };

  const get = () => fetchData("GET");
  const post = (payload?: TPayload) => fetchData("POST", payload);
  const put = (payload?: TPayload) => fetchData("PUT", payload);
  const del = () => fetchData("DELETE");

  return { data, error, get, post, put, del };
}

export default useFetch;
