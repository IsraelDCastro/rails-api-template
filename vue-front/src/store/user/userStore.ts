import { defineStore } from "pinia";
import { ref } from "vue";

export type StoredUser = {
  id?: number;
  name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  kind_of_account?: string;
  [key: string]: unknown;
};

function parseStoredUser(payload: string | null): StoredUser | null {
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as StoredUser;
  } catch {
    return null;
  }
}

export const useUserStore = defineStore("user", () => {
  const userData = ref<StoredUser | null>(null);
  const token = ref("");
  const sessionId = ref("");
  const user_signed_in = ref(false);

  if (typeof window !== "undefined") {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const storage = rememberMe ? localStorage : sessionStorage;

    user_signed_in.value = storage.getItem("user_signed_in") === "true";
    token.value = storage.getItem("token") ?? "";
    sessionId.value = storage.getItem("sessionId") ?? "";
    userData.value = parseStoredUser(storage.getItem("user"));
  }

  const $reset = () => {
    userData.value = null;
    token.value = "";
    sessionId.value = "";
    user_signed_in.value = false;
  };

  return { userData, token, sessionId, user_signed_in, $reset };
});
