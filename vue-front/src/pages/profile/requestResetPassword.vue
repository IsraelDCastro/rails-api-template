<template>
	<section class="section flex justify-center">
		<form @submit.prevent="sendRequestResetPassword" class="form flex w-full flex-col md:w-9/12 lg:w-5/12">
			<h4 class="mb-2">Request reset password</h4>
			<p class="mb-4 text-slate-600">
				Add your email to receive instructions about how to reset your password.
			</p>
			<InputUI id="email" v-model="email" type="email" name="email" label="Email" required />
			<ButtonUI type="submit" color="primary" class="mt-4 w-full">
				Request a reset password
			</ButtonUI>
		</form>
	</section>
</template>

<script setup lang="ts">
import { ButtonUI, InputUI } from "simplekit-vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/user/userStore";
import { Notification } from "@/lib";
import { useRouter } from "vue-router";
import { useUserForgotPasswordStore } from "@/store/user/authStore";

const useRequestResetPasswordStore = useUserForgotPasswordStore();
const router = useRouter();
const userStore = useUserStore();
const email = ref("");

function sendRequestResetPassword() {
	useRequestResetPasswordStore.requestResetPassword(email.value);
}

onMounted(() => {
	if (userStore.user_signed_in) {
		Notification("You are logged in, log out to request a new password.", "warning");
		router.push("/");
	}
});
</script>
