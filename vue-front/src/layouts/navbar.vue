<template>
  <div class="wrap-navbar">
    <div class="topbar">
      <p class="slogan-topbar">Where technology is the future.</p>
      <ul class="topbar-menu">
        <template v-if="useStore.user_signed_in">
          <router-link
            to="/profile/edit"
            class="topbar-link"
            active-class="is-active"
          >
            Welcome, {{ useStore.userData.name }}
          </router-link>
          <a href="#" @click="signOut.signOut" class="topbar-link">Sign out</a>
        </template>
        <template v-else>
          <li>
            <router-link
              to="/sign-in"
              class="topbar-link"
              active-class="is-active"
              >Sign in</router-link
            >
          </li>
          <li>
            <router-link
              to="/sign-up"
              class="topbar-link"
              active-class="is-active"
              >Sign up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
    <nav class="navbar is-filled">
      <div class="logo">
        <router-link to="/">Tech Shop</router-link>
      </div>
      <ul class="top-0 menu" :class="{ 'is-opened': menu }">
        <li>
          <router-link to="/" class="nav-link" active-class="is-active"
            >Home</router-link
          >
        </li>
      </ul>
      <span
        class="burger-menu"
        :class="{ 'is-active': menu }"
        @click="openCloseMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </span>
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
