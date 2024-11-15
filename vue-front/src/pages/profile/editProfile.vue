<template>
  <div>
    <h1 class="mb-8">Edit profile</h1>
    <form @submit.prevent>
      <div class="double-field">
        <div class="field">
          <label for="name" class="label">Name</label>
          <input type="text" v-model="name" name="name" class="input" placeholder="John" />
        </div>
        <div class="field">
          <label for="last_name" class="label">Last name</label>
          <input type="text" v-model="lastName" name="last_name" class="input" placeholder="Smith" />
        </div>
        <div class="field">
          <label for="username" class="label">Username</label>
          <input type="text" v-model="username" name="username" class="input" placeholder="Smith203" />
        </div>
        <div class="field">
          <label for="email" class="label">Email</label>
          <input type="email" v-model="email" name="email" class="input" placeholder="john@smith.com" />
        </div>
        <div class="field">
          <label for="kind_of_account" class="label">Kind of account</label>
          <div class="select">
            <select v-model="kind_of_account" class="select-inner" name="kind_of_account" id="kind_of_account">
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="owner">Store Owner</option>
            </select>
          </div>
        </div>
        <div class="field field-button">
          <button class="button button-primary" @click="updateUserAccount"> Update account </button>
        </div>
      </div>
    </form>
    <hr class="my-10" />
    <h5>Want to delete your account? just click the button below.</h5>
    <p class="text-red-400 text-sm">This action can be undo.</p>
    <button class="button button-danger-outline is-small" @click="deleteUserAccountStore.deleteUserAccount()"> Delete my account </button>
  </div>
</template>

<script setup>
  import { useDeleteUserStore, useEditUserStore } from "@/store/user/authStore";
  import { onMounted, ref } from "vue";
  import { useUserStore } from "@/store/user/userStore";
  const editUserStore = useEditUserStore();
  const deleteUserAccountStore = useDeleteUserStore();
  const userStore = useUserStore();

  const name = ref("");
  const lastName = ref("");
  const username = ref("");
  const email = ref("");
  const kind_of_account = ref("");

  function updateUserAccount() {
    editUserStore.updateUser(userStore.userData.id, name.value, lastName.value, username.value, email.value, kind_of_account.value);
  }

  async function loadUserData() {
    name.value = userStore.userData.name || "";
    lastName.value = userStore.userData.last_name || "";
    username.value = userStore.userData.username || "";
    email.value = userStore.userData.email || "";
    kind_of_account.value = userStore.userData.kind_of_account || "";
  }

  onMounted(() => loadUserData());
</script>
