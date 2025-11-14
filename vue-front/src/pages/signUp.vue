<template>
	<section class="flex justify-center py-8">
		<form @submit.prevent="createAnAccount" class="flex w-full flex-col space-y-6 md:w-9/12 lg:w-5/12">
			<h1 class="text-2xl">Sign Up.</h1>

			<InputUI id="name" v-model="name" type="text" label="Name" required />
			<InputUI id="last_name" v-model="last_name" type="text" label="Last name" required />
			<InputUI id="username" v-model="username" type="text" label="Username" required />
				<InputUI
					id="email"
					v-model="email"
					type="email"
					label="Email"
					required
					:error-message="email.length > 0 && !isValidEmail ? 'Ingresa un correo válido' : ''"
				/>
				<PasswordInput id="password" v-model="password" label="Password" required description="Mínimo 6 caracteres" />
				<PasswordInput
					id="confirm_password"
					v-model="confirm_password"
					label="Confirm password"
					required
					:error-message="confirm_password.length > 0 && !passwordsMatch ? 'Las contraseñas no coinciden' : ''"
				/>

			<ButtonUI type="submit" color="primary" class="w-full" :is-disabled="!canSubmit">
				Sign up
			</ButtonUI>

			<hr class="my-4" />

			<router-link to="/sign-in" class="text-blue-500 hover:underline">I have an account.</router-link>
		</form>
	</section>
</template>

<script setup lang="ts">
import { ButtonUI, InputUI, PasswordInput } from "simplekit-vue";
import { computed, ref } from "vue";
import { useSignUpStore } from "@/store/user/authStore";
import { useSeo } from "@/composable/useSeo";

const signUpStore = useSignUpStore();

const name = ref("");
const last_name = ref("");
const email = ref("");
const username = ref("");
const password = ref("");
const confirm_password = ref("");

const isValidEmail = computed(() => /\S+@\S+\.\S+/.test(email.value));
const passwordsMatch = computed(() => password.value.length >= 6 && password.value === confirm_password.value);
const canSubmit = computed(() => name.value !== "" && username.value !== "" && isValidEmail.value && passwordsMatch.value);

useSeo({
	title: "Crear cuenta",
	description: "Regístrate para sincronizar tu panel Vue Simplekit con el backend Rails.",
	canonical: "https://example.com/sign-up",
	jsonLd: [
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://example.com/" },
				{ "@type": "ListItem", position: 2, name: "Registro" },
			],
		},
	],
});

function createAnAccount() {
	if (!canSubmit.value) return;
	signUpStore.signUp(name.value, last_name.value, username.value, email.value, password.value, confirm_password.value);
}
</script>
