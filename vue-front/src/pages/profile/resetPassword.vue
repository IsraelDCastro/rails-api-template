<template>
	<section class="flex justify-center section">
		<form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12 form">
			<h4 class="mb-2">Set new password</h4>
			<p class="mb-4 text-slate-600">
				Here you can change your password. Token administrate to change password expire in 15 minutes, be sure to change
				before the time.
			</p>
			<div class="field">
				<label for="new_password" class="label">New password</label>
				<input id="new_password" type="password" name="new_password" v-model="newPassword" class="input"
					placeholder="********" required />
			</div>
			<div class="field">
				<label for="confirm_new_password" class="label">Confirm new password</label>
				<input id="confirm_new_password" type="password" name="confirm_new_password" v-model="confirmNewPassword"
					class="input" placeholder="********" required />
			</div>
			<div class="field field-button">
				<button class="w-full button button-primary" @click="updateUserPassword"> Request a reset password </button>
			</div>
		</form>
	</section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user/userStore";
import { Notification } from "@/lib";
import { useRouter } from "vue-router";
import { useUserForgotPasswordStore } from "@/store/user/authStore";

const useRequestResetPasswordStore = useUserForgotPasswordStore();
const router = useRouter();
const userStore = useUserStore();
const newPassword = ref("");
const confirmNewPassword = ref("");

function updateUserPassword() {
	useRequestResetPasswordStore.resetUserPassword(newPassword.value, confirmNewPassword.value);
}

onMounted(() => {
	if (userStore.user_signed_in) {
		Notification("You are logged in, you can reset your password in your profile.", "warning");
		router.push("/");
	}
	useRequestResetPasswordStore.checkUserResetPasswordToken();
});
</script>
