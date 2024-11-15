<template>
	<section class="flex justify-center py-8">
		<form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12">
			<h1 class="mb-8 text-2xl">Sign In</h1>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="email" type="email" name="email" v-model="email" class="w-full" required />
				<label for="email">Email</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<Password inputClass="w-full" id="password" name="password" v-model="password" class="w-full" required />
				<label for="password">Your password</label>
			</FloatLabel>

			<div class="flex items-center gap-2 mb-6">
				<Checkbox inputId="remember" value="rememberLogged" v-model="rememberLogged" name="remember" class="mr-2" />
				<label for="remember" class="text-gray-700">Remember me</label>
			</div>

			<div class="field">
				<Button label="Sign in" class="w-full p-button-primary" @click="startSignIn" />
			</div>

			<hr class="my-4" />

			<router-link to="/request-reset-password" class="mb-4 text-blue-500 hover:underline">
				I forgot my password.
			</router-link>
			<router-link to="/sign-up" class="text-blue-500 hover:underline">
				I don't have an account.
			</router-link>
		</form>
	</section>
</template>

<script setup>
import { ref } from "vue";
import { useSignInStore } from "@/store/user/authStore";
const signInStore = useSignInStore();

const email = ref("");
const password = ref("");
const rememberLogged = ref(false);

function startSignIn() {
	signInStore.signIn(email.value, password.value, rememberLogged.value);
}
</script>
