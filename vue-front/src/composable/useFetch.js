import { ref } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = async (method, body = null) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          "x-csrf-token": document.getElementsByName("csrf-token")[0].content,
        },
        body: body ? JSON.stringify(body) : null,
      });
      const json = await response.json();
      data.value = json;
    } catch (err) {
      error.value = err;
    }
  };

  const get = () => fetchData("GET", null);
  const post = (body = null) => fetchData("POST", body);
  const put = (body = null) => fetchData("PUT", body);
  const del = () => fetchData("DELETE", null);

  return { data, error, get, post, put, del };
}
