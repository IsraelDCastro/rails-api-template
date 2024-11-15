<template>
	<section class="flex justify-center py-8">
		<form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12">
			<h1 class="mb-8 text-2xl">Sign Up.</h1>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="name" type="text" v-model="name" class="w-full" required placeholder=" " />
				<label for="name">Name</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="last_name" type="text" v-model="last_name" class="w-full" required placeholder=" " />
				<label for="last_name">Last name</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="username" type="text" v-model="username" class="w-full" required placeholder=" " />
				<label for="username">Username</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="email" type="email" v-model="email" ref="emailInput" class="w-full" required placeholder=" " />
				<label for="email">Email</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="password" type="password" v-model="password" class="w-full" required placeholder=" " />
				<label for="password">Password</label>
			</FloatLabel>

			<FloatLabel variant="on" class="mb-6">
				<InputText id="confirm_password" type="password" v-model="confirm_password" class="w-full" required
					placeholder=" " />
				<label for="confirm_password">Confirm password</label>
			</FloatLabel>

			<Button label="Sign up" @click="createAnAccount" />

			<hr class="my-4" />

			<router-link to="/sign-in" class="text-blue-500 hover:underline">I have an account.</router-link>
		</form>
	</section>
</template>

<script setup>
import { ref } from "vue";
import { useSignUpStore } from "@/store/user/authStore";
const signUpStore = useSignUpStore();

const name = ref("");
const last_name = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirm_password = ref("");

const validate_email = ref(false);
const emailInput = ref(null);

function createAnAccount() {
	signUpStore.signUp(name.value, last_name.value, username.value, email.value, password.value, confirm_password.value);
}
</script>
