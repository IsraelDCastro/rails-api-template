<template>
  <section class="flex justify-center section">
    <form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12 form">
      <h1 class="mb-8 text-2xl">Sign Up.</h1>
      <div class="field">
        <label for="name" class="label">Name</label>
        <input id="name" type="text" v-model="name" class="input" placeholder="John" required />
      </div>
      <div class="field">
        <label for="last_name" class="label">Last name</label>
        <input id="last_name" type="text" v-model="last_name" class="input" placeholder="Smith" required />
      </div>
      <div class="field">
        <label for="username" class="label">Username</label>
        <input id="username" type="text" v-model="username" class="input" placeholder="Smith203" required />
      </div>
      <div class="field">
        <label for="email" class="label">Email</label>
        <input
          id="email"
          type="email"
          v-model="email"
          ref="emailInput"
          class="input"
          @change="validateEmail"
          placeholder="john@example.com"
          required
        />
        <span class="error-message" v-if="validate_email">Please enter a valid email address.</span>
      </div>
      <div class="field">
        <label for="password" class="label">Password</label>
        <input id="password" type="password" v-model="password" class="input" placeholder="*********" required />
      </div>
      <div class="field">
        <label for="confirm_password" class="label">Confirm password</label>
        <input id="confirm_password" type="password" v-model="confirm_password" class="input" placeholder="*********" required />
      </div>
      <div class="field field-button">
        <button class="w-full button button-secondary" @click="createAnAccount"> Sign up </button>
      </div>
      <hr class="my-4" />
      <router-link to="/sign-in" class="link info">I have an account.</router-link>
    </form>
  </section>
</template>

<script setup>
  import { computed, ref } from "vue";
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
  const validateEmail = computed(() => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      validate_email.value = false;
      emailInput.value.classList.remove("error");
      return false;
    } else {
      validate_email.value = true;
      emailInput.value.classList.add("error");
      return true;
    }
  });

  function createAnAccount() {
    signUpStore.signUp(name.value, last_name.value, username.value, email.value, password.value, confirm_password.value);
  }
</script>
