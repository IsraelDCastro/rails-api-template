import { defineStore } from "pinia";
import { useUserStore } from "@/store/user/userStore";
import { Notification } from "@/lib";
import { useRoute, useRouter } from "vue-router";

export const useSignInStore = defineStore("sign-in", () => {
  const userStore = useUserStore();
  const router = useRouter();

  const signIn = async (email, password, rememberLogged) => {
    const signInUser = {
      email: email,
      password: password,
    };

    await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/sessions/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_signed_in) {
          userStore.sessionId = data.session.session_id;
          userStore.token = data.token;
          userStore.userData = JSON.parse(JSON.stringify(data.user));
          userStore.user_signed_in = data.user_signed_in;

          if (rememberLogged) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("user_signed_in", data.user_signed_in);
            localStorage.setItem("sessionId", data.session.session_id);
            localStorage.setItem("rememberMe", rememberLogged);
            Notification(data.success, "success");
          } else {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            sessionStorage.setItem("user_signed_in", data.user_signed_in);
            sessionStorage.setItem("sessionId", data.session.session_id);
            Notification(data.success, "success");
          }

          setTimeout(() => router.push("/profile/edit"), 500);
        } else {
          Notification(data.error);
        }
      });
  };

  return { signIn };
});

export const useSignUpStore = defineStore("sign-up", () => {
  const userStore = useUserStore();
  const router = useRouter();

  const signUp = async (name, last_name, username, email, password, password_confirmation) => {
    const signUpUser = {
      name: name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };

    await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify(signUpUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_created) {
          userStore.sessionId = data.session.session_id;
          userStore.token = data.token;
          userStore.userData = JSON.parse(JSON.stringify(data.user));
          userStore.user_signed_in = data.user_created;

          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("user_signed_in", data.user_created);
          localStorage.setItem("sessionId", data.session.session_id);
          Notification(data.success, "success");

          setTimeout(() => router.push("/profile/edit"), 500);
        } else {
          data.map((error) => {
            Notification(error, "error", 2500);
          });
        }
      });
  };

  return { signUp };
});

export const useSignOutStore = defineStore("sign-out", () => {
  const router = useRouter();
  const userStore = useUserStore();
  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_signed_in");
    localStorage.removeItem("sessionId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_signed_in");
    sessionStorage.removeItem("sessionId");
    Notification("Signed out successfully", "success");

    router.push("/");
    userStore.$reset();
  }

  return { signOut };
});

export const useEditUserStore = defineStore("edit-user", () => {
  const userStore = useUserStore();

  async function updateUser(id, name, last_name, username, email, kind_of_account) {
    await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/update-user/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        name: name || "",
        last_name: last_name || "",
        username: username || "",
        email: email || "",
        kind_of_account: kind_of_account || "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user_created) {
          userStore.token = data.session.session_id;
          userStore.userData = JSON.parse(JSON.stringify(data.user));
          userStore.user_signed_in = data.user_created;

          localStorage.setItem("token", data.session.session_id);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("user_signed_in", data.user_created);

          Notification(data.success, "success");
        } else {
          data.map((error) => {
            Notification(error, "error", 2500);
          });
        }
      });
  }

  return {
    updateUser,
  };
});

export const useEditUserPasswordStore = defineStore("edit-password-user", () => {
  const userStore = useUserStore();
  async function updatePasswordUser(current_password, new_password, confirm_password) {
    await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/update/${userStore.userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        email: userStore.userData.email,
        current_password: current_password || null,
        password: new_password || null,
        password_confirmation: confirm_password || null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.password_updated) {
          Notification(data.success, "success");
        } else {
          Notification(data.error, "error");
        }
      });
  }

  return {
    updatePasswordUser,
  };
});

export const useUserForgotPasswordStore = defineStore("forgot-password-user", () => {
  const route = useRoute();
  const router = useRouter();

  function requestResetPassword(email) {
    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/request-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Notification(
            "We sent you an email with the information to reset your password. Please check your inbox email or your spam section.",
            "success"
          );
          router.push("/sign-in");
        } else {
          Notification(data.error, "error");
        }
      });
  }
  function checkUserResetPasswordToken() {
    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/check-reset-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        token: route.query.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.failure) {
          Notification(data.error, "error", 4000);
          router.push("/request-reset-password");
        }
      });
  }

  function resetUserPassword(password, password_confirmation) {
    fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/reset`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
      body: JSON.stringify({
        password: password,
        password_confirmation: password_confirmation,
        token: route.query.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          Notification(data.message, "success", 4000);
          router.push("/sign-in");
        } else {
          Notification(data.error, "error", 4000);
          router.push("/request-reset-password");
        }
      });
  }

  return {
    requestResetPassword,
    checkUserResetPasswordToken,
    resetUserPassword,
  };
});

export const useDeleteUserStore = defineStore("delete-user", () => {
  const userStore = useUserStore();
  const router = useRouter();
  async function deleteUserAccount() {
    await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/delete/${userStore.userData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.userAccountDeleted) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("user_signed_in");
          localStorage.removeItem("sessionId");
          Notification(data.success, "success");

          router.push("/");
          userStore.$reset();
        } else {
          Notification(data.error, "error");
        }
      });
  }

  return { deleteUserAccount };
});
