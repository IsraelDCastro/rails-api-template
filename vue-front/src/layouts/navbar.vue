<template>
	<div class="w-full">
		<div class="bg-gray-800 text-white p-2 flex justify-between items-center">
			<p class="text-sm">Where technology is the future.</p>
			<ul class="flex items-center space-x-4">
				<template v-if="useStore.user_signed_in">
					<router-link to="/profile/edit" class="text-white hover:text-gray-400" active-class="font-bold">
						Welcome, {{ useStore.userData.name }}
					</router-link>
					<a href="#" @click="signOut.signOut" class="text-white hover:text-gray-400">
						Sign out
					</a>
				</template>
				<template v-else>
					<li>
						<router-link to="/sign-in" class="text-white hover:text-gray-400" active-class="font-bold">Sign
							in</router-link>
					</li>
					<li>
						<router-link to="/sign-up" class="text-white hover:text-gray-400" active-class="font-bold">Sign
							up</router-link>
					</li>
				</template>
			</ul>
		</div>
		<nav class="bg-gray-900 text-white p-4 flex justify-between items-center">
			<div class="text-lg font-bold">
				<router-link to="/">Tech Shop</router-link>
			</div>
			<ul class="hidden md:flex space-x-6 items-center" :class="{ 'block': menu, 'hidden': !menu }">
				<li>
					<router-link to="/" class="hover:text-gray-400" active-class="font-bold">Home</router-link>
				</li>
			</ul>
			<button class="md:hidden flex flex-col items-center focus:outline-none" @click="openCloseMenu">
				<span :class="menu ? 'bg-white' : 'bg-gray-400'" class="block h-0.5 w-6 mb-1"></span>
				<span :class="menu ? 'bg-white' : 'bg-gray-400'" class="block h-0.5 w-6 mb-1"></span>
				<span :class="menu ? 'bg-white' : 'bg-gray-400'" class="block h-0.5 w-6"></span>
			</button>
		</nav>
	</div>
</template>

<script setup>
import { useUserStore } from "@/store/user/userStore";
import { useSignOutStore } from "@/store/user/authStore";
import { ref } from "vue";

const useStore = useUserStore();
const signOut = useSignOutStore();
const menu = ref(false);
const openCloseMenu = () => (menu.value = !menu.value);
</script>
