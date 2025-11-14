import { defineStore } from "pinia";
import { useUserStore, type StoredUser } from "@/store/user/userStore";
import { Notification } from "@/lib";
import { useRoute, useRouter } from "vue-router";

type AuthResponse = {
	user_signed_in?: boolean;
	user_created?: boolean;
	success?: string;
	error?: string | string[];
	token?: string;
	session?: { session_id: string };
	user?: StoredUser;
};

type PasswordResponse = {
	password_updated?: boolean;
	success?: string;
	error?: string;
};

type ForgotPasswordResponse = {
	success?: boolean;
	error?: string;
	message?: string;
	failure?: boolean;
};

type DeleteAccountResponse = {
	userAccountDeleted?: boolean;
	success?: string;
	error?: string;
};

const persistMemoFlag = (rememberLogged: boolean) => {
	if (rememberLogged) {
		localStorage.setItem("rememberMe", "true");
	} else {
		localStorage.removeItem("rememberMe");
	}
};

const persistAuthSession = (storage: Storage, sessionId: string, token: string, user: StoredUser, signedIn: boolean) => {
	storage.setItem("token", token);
	storage.setItem("user", JSON.stringify(user));
	storage.setItem("user_signed_in", String(signedIn));
	storage.setItem("sessionId", sessionId);
};

const normalizeError = (message?: string | string[]) => {
	if (!message) return undefined;
	return Array.isArray(message) ? message.join(", ") : message;
};

export const useSignInStore = defineStore("sign-in", () => {
	const userStore = useUserStore();
	const router = useRouter();

	const signIn = async (email: string, password: string, rememberLogged: boolean) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/sessions/sign-in`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password })
			});

			const raw = (await response.json()) as unknown;

			if (Array.isArray(raw)) {
				raw.forEach((error) => Notification(String(error), "error", 2500));
				return;
			}

			const data = raw as AuthResponse;

			if (data.user_signed_in && data.user && data.token && data.session?.session_id) {
				userStore.sessionId = data.session.session_id;
				userStore.token = data.token;
				userStore.userData = { ...data.user };
				userStore.user_signed_in = true;

				const storage = rememberLogged ? localStorage : sessionStorage;
				persistMemoFlag(rememberLogged);
				persistAuthSession(storage, data.session.session_id, data.token, data.user, data.user_signed_in);

				Notification(data.success ?? "Signed in successfully", "success");
				await router.push("/profile/edit");
				return;
			}

			Notification(normalizeError(data.error) ?? "Unable to sign in. Please verify your credentials.", "error");
		} catch (error) {
			console.error(error);
			Notification("Unable to sign in. Please try again in a few moments.", "error");
		}
	};

	return { signIn };
});

export const useSignUpStore = defineStore("sign-up", () => {
	const userStore = useUserStore();
	const router = useRouter();

	const signUp = async (name: string, last_name: string, username: string, email: string, password: string, password_confirmation: string) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/sign-up`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({ name, last_name, username, email, password, password_confirmation })
			});

			const raw = (await response.json()) as unknown;

			if (Array.isArray(raw)) {
				raw.forEach((error) => Notification(String(error), "error", 2500));
				return;
			}

			const data = raw as AuthResponse;

			if (data.user_created && data.user && data.token && data.session?.session_id) {
				userStore.sessionId = data.session.session_id;
				userStore.token = data.token;
				userStore.userData = { ...data.user };
				userStore.user_signed_in = true;

				persistMemoFlag(true);
				persistAuthSession(localStorage, data.session.session_id, data.token, data.user, data.user_created);

				Notification(data.success ?? "Account created successfully", "success");
				await router.push("/profile/edit");
				return;
			}

			Notification(normalizeError(data.error) ?? "Unable to create account.", "error");
		} catch (error) {
			console.error(error);
			Notification("Unable to create account. Please try again later.", "error");
		}
	};

	return { signUp };
});

export const useSignOutStore = defineStore("sign-out", () => {
	const router = useRouter();
	const userStore = useUserStore();

	const signOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("user_signed_in");
		localStorage.removeItem("sessionId");
		localStorage.removeItem("rememberMe");
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");
		sessionStorage.removeItem("user_signed_in");
		sessionStorage.removeItem("sessionId");

		Notification("Signed out successfully", "success");
		router.push("/");
		userStore.$reset();
	};

	return { signOut };
});

export const useEditUserStore = defineStore("edit-user", () => {
	const userStore = useUserStore();

	const updateUser = async (id: number, name: string, last_name: string, username: string, email: string, kind_of_account: string) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/update-user/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({ name, last_name, username, email, kind_of_account })
			});

			const data = (await response.json()) as AuthResponse;

			if (data.user_created && data.user && data.session?.session_id) {
				userStore.token = data.session.session_id;
				userStore.userData = { ...data.user };
				userStore.user_signed_in = true;

				persistAuthSession(localStorage, data.session.session_id, data.session.session_id, data.user, true);
				Notification(data.success ?? "Account updated successfully", "success");
				return;
			}

			Notification(normalizeError(data.error) ?? "We could not update your account.", "error");
		} catch (error) {
			console.error(error);
			Notification("We could not update your account. Please try again.", "error");
		}
	};

	return { updateUser };
});

export const useEditUserPasswordStore = defineStore("edit-password-user", () => {
	const userStore = useUserStore();

	const updatePasswordUser = async (current_password: string, new_password: string, confirm_password: string) => {
		const userId = userStore.userData?.id;
		const email = userStore.userData?.email;

		if (!userId || !email) {
			Notification("We could not find your account information.", "error");
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/update/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({
					email,
					current_password: current_password || null,
					password: new_password || null,
					password_confirmation: confirm_password || null
				})
			});

			const data = (await response.json()) as PasswordResponse;

			if (data.password_updated) {
				Notification(data.success ?? "Password updated successfully", "success");
			} else {
				Notification(data.error ?? "Unable to update password.", "error");
			}
		} catch (error) {
			console.error(error);
			Notification("Unable to update password. Please try again later.", "error");
		}
	};

	return { updatePasswordUser };
});

export const useUserForgotPasswordStore = defineStore("forgot-password-user", () => {
	const route = useRoute();
	const router = useRouter();

	const resolveToken = () => {
		const token = route.query.token;
		if (Array.isArray(token)) {
			return token[0] ?? "";
		}
		return token ?? "";
	};

	const requestResetPassword = async (email: string) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/request-reset`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({ email })
			});

			const data = (await response.json()) as ForgotPasswordResponse;

			if (data.success) {
				Notification(
					"We sent you an email with the information to reset your password. Please check your inbox email or your spam section.",
					"success"
				);
				router.push("/sign-in");
			} else {
				Notification(data.error ?? "Unable to send the reset email.", "error");
			}
		} catch (error) {
			console.error(error);
			Notification("Unable to send the reset email.", "error");
		}
	};

	const checkUserResetPasswordToken = async () => {
		const token = resolveToken();

		if (!token) {
			Notification("The reset token is missing. Request a new email.", "error");
			router.push("/request-reset-password");
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/check-reset-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({ token })
			});

			const data = (await response.json()) as ForgotPasswordResponse;

			if (data.failure) {
				Notification(data.error ?? "The reset token is invalid or expired.", "error", 4000);
				router.push("/request-reset-password");
			}
		} catch (error) {
			console.error(error);
			Notification("We could not validate your token.", "error");
			router.push("/request-reset-password");
		}
	};

	const resetUserPassword = async (password: string, password_confirmation: string) => {
		const token = resolveToken();

		if (!token) {
			Notification("The reset token is missing. Request a new email.", "error");
			router.push("/request-reset-password");
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/passwords/reset`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				},
				body: JSON.stringify({ password, password_confirmation, token })
			});

			const data = (await response.json()) as ForgotPasswordResponse;

			if (data.success) {
				Notification(data.message ?? "Password updated successfully", "success", 4000);
				router.push("/sign-in");
			} else {
				Notification(data.error ?? "Unable to update password.", "error", 4000);
				router.push("/request-reset-password");
			}
		} catch (error) {
			console.error(error);
			Notification("Unable to update password.", "error", 4000);
			router.push("/request-reset-password");
		}
	};

	return {
		requestResetPassword,
		checkUserResetPasswordToken,
		resetUserPassword
	};
});

export const useDeleteUserStore = defineStore("delete-user", () => {
	const userStore = useUserStore();
	const router = useRouter();

	const deleteUserAccount = async () => {
		const userId = userStore.userData?.id;
		if (!userId) {
			Notification("We could not find a user to delete.", "error");
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_API_HOST}/api/v1/users/registration/delete/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"x-requested-with": "XMLHttpRequest"
				}
			});

			const data = (await response.json()) as DeleteAccountResponse;

			if (data.userAccountDeleted) {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				localStorage.removeItem("user_signed_in");
				localStorage.removeItem("sessionId");
				localStorage.removeItem("rememberMe");

				router.push("/");
				userStore.$reset();
				Notification(data.success ?? "Account deleted successfully.", "success");
			} else {
				Notification(data.error ?? "Unable to delete account.", "error");
			}
		} catch (error) {
			console.error(error);
			Notification("Unable to delete account.", "error");
		}
	};

	return { deleteUserAccount };
});
