<template>
  <section class="flex justify-center section">
    <form @submit.prevent class="flex flex-col w-full md:w-9/12 lg:w-5/12 form">
      <h4 class="mb-2">Request reset password</h4>
      <p class="mb-4 text-slate-600"> Add your email to receive instructions about how to reset your password. </p>
      <div class="field">
        <label for="email" class="label">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          ref="emailInput"
          @change="validateEmail"
          v-model="email"
          class="input"
          placeholder="john@example.com"
          required
        />
        <span class="error-message" v-if="validate_email">Please enter a valid email address.</span>
      </div>
      <div class="field field-button">
        <button class="w-full button button-primary" @click="sendRequestResetPassword"> Request a reset password </button>
      </div>
    </form>
  </section>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import { useUserStore } from "@/store/user/userStore";
  import { Notification } from "@/lib";
  import { useRouter } from "vue-router";
  import { useUserForgotPasswordStore } from "@/store/user/authStore";

  const useRequestResetPasswordStore = useUserForgotPasswordStore();
  const router = useRouter();
  const userStore = useUserStore();
  const email = ref("");
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
