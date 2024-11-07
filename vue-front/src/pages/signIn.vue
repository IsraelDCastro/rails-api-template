<template>
  <section class="flex justify-center section">
    <form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12 form">
      <h1 class="mb-8 text-2xl">Sign In.</h1>
      <div class="field">
        <label for="email" class="label">Email</label>
        <input id="email" type="email" name="email" v-model="email" class="input" placeholder="john@example.com" required />
      </div>
      <div class="field">
        <label for="password" class="label">Your password</label>
        <input id="password" type="password" name="password" v-model="password" class="input" placeholder="*********" required />
      </div>
      <div class="field">
        <div class="checkbox">
          <input type="checkbox" id="remember" class="checkbox" v-model="rememberLogged" name="remember" />
          <label for="remember" class="label">Remember me</label>
        </div>
      </div>
      <div class="field field-button">
        <button class="w-full button button-primary" @click="startSignIn"> Sign in </button>
      </div>
      <hr class="my-4" />
      <router-link to="/request-reset-password" class="mb-4 link info">I forgot my password.</router-link>
      <router-link to="/sign-up" class="link info">I don't have an account.</router-link>
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
