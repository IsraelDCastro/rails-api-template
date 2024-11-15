<template>
  <div>
    <h1 class="mb-8">Edit password</h1>
    <form @submit.prevent>
      <div class="double-field">
        <div class="field">
          <label for="current_password" class="label">Current password</label>
          <input
            type="password"
            required
            ref="inputCurrentPassword"
            v-model="current_password"
            name="current_password"
            class="input"
            placeholder="Current password" />
        </div>
        <div class="field">
          <label for="new_password" class="label">New password</label>
          <input
            type="password"
            required
            ref="inputNewPassword"
            v-model="new_password"
            name="new_password"
            class="input"
            placeholder="New password" />
        </div>
        <div class="field">
          <label for="confirm_password" class="label">Confirm new password</label>
          <input
            type="password"
            required
            ref="inputConfirmNewPassword"
            v-model="confirm_password"
            name="confirm_password"
            class="input"
            placeholder="Confirm new password" />
        </div>
        <div class="field field-button">
          <button class="button button-primary" @click="updatePassword"> Update password </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useEditUserPasswordStore } from "@/store/user/authStore";
const passwordStore = useEditUserPasswordStore();

const current_password = ref("");
const new_password = ref("");
const confirm_password = ref("");

const inputCurrentPassword = ref("");
const inputNewPassword = ref("");
const inputConfirmNewPassword = ref(null);

function updatePassword() {
  if (inputCurrentPassword.value.value === "") {
    inputCurrentPassword.value.classList.add("error");
  } else inputCurrentPassword.value.classList.remove("error");

  if (inputNewPassword.value.value === "") {
    inputNewPassword.value.classList.add("error");
  } else inputNewPassword.value.classList.remove("error");

  if (inputConfirmNewPassword.value.value === "") {
    inputConfirmNewPassword.value.classList.add("error");
  } else inputConfirmNewPassword.value.classList.remove("error");
  passwordStore.updatePasswordUser(current_password.value, new_password.value, confirm_password.value);
}
</script>
