<template>
	<section class="flex justify-center py-8">
		<form @submit.prevent="startSignIn" class="flex w-full flex-col space-y-6 md:w-9/12 lg:w-5/12">
			<h1 class="text-2xl">Sign In</h1>

			<InputUI
				id="email"
				v-model="email"
				type="email"
				name="email"
				label="Email"
				required
				:error-message="email.length > 0 && !isValidEmail ? 'Ingresa un correo válido' : ''"
			/>

			<PasswordInput id="password" v-model="password" name="password" label="Your password" required description="Mínimo 6 caracteres" />

			<CheckboxUI v-model="rememberLogged" label="Remember me" />

			<ButtonUI type="submit" color="primary" class="w-full" :is-disabled="!canSubmit">
				Sign in
			</ButtonUI>

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

<script setup lang="ts">
import { ButtonUI, CheckboxUI, InputUI, PasswordInput } from "simplekit-vue";
import { computed, ref } from "vue";
import { useSignInStore } from "@/store/user/authStore";
import { useSeo } from "@/composable/useSeo";

const signInStore = useSignInStore();

const email = ref("");
const password = ref("");
const rememberLogged = ref(false);
const isValidEmail = computed(() => /\S+@\S+\.\S+/.test(email.value));
const canSubmit = computed(() => isValidEmail.value && password.value.length >= 6);

useSeo({
	title: "Iniciar sesión",
	description: "Accede para sincronizar tus módulos Vue Simplekit con tu API Rails.",
	canonical: "https://example.com/sign-in",
	jsonLd: [
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://example.com/" },
				{ "@type": "ListItem", position: 2, name: "Iniciar sesión" },
			],
		},
	],
});

function startSignIn() {
	if (!canSubmit.value) return;
	signInStore.signIn(email.value, password.value, rememberLogged.value);
}
</script>
