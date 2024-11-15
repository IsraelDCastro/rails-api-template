import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userData = ref({});
  const token = ref("");
  const sessionId = ref("");
  const user_signed_in = ref(false);

  if (Boolean(localStorage.getItem("rememberMe"))) {
    user_signed_in.value = Boolean(localStorage.getItem("user_signed_in"));
    token.value = localStorage.getItem("token");
    sessionId.value = localStorage.getItem("sessionId");
    userData.value = JSON.parse(localStorage.getItem("user"));
  } else {
    user_signed_in.value = Boolean(sessionStorage.getItem("user_signed_in"));
    token.value = sessionStorage.getItem("token");
    sessionId.value = sessionStorage.getItem("sessionId");
    userData.value = JSON.parse(sessionStorage.getItem("user"));
  }

  const $reset = () => {
    userData.value = {};
    token.value = "";
    sessionId.value = "";
    user_signed_in.value = false;
  };

  return { userData, token, sessionId, user_signed_in, $reset };
});
