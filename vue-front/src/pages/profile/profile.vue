<template>
  <div class="flex">
    <aside class="sidebar">
      <h4>Welcome, {{ userStore.userData.name }}</h4>
      <hr class="sidebar-divider" />
      <ul class="sidebar-nav">
        <li>
          <router-link to="/profile/edit" class="sidebar-item" active-class="is-active">
            <span class="sidebar-icon"><i class="bi bi-person"></i></span>
            Profile
          </router-link>
        </li>
        <li>
          <router-link to="/profile/password" class="sidebar-item" active-class="is-active">
            <span class="sidebar-icon"><i class="bi bi-shield-lock"></i></span>
            Password
          </router-link>
        </li>
        <li>
          <router-link to="/profile/posts" class="sidebar-item" active-class="is-active">
            <span class="sidebar-icon"><i class="bi bi-file-post"></i></span>
            Posts
          </router-link>
        </li>
        <li>
          <router-link to="/profile/products" class="sidebar-item" active-class="is-active">
            <span class="sidebar-icon"><i class="bi bi-box-seam"></i></span>
            Products
          </router-link>
        </li>
      </ul>
    </aside>
    <div class="w-3/4 basis-3/4 p-8 flex-1">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from "@/store/user/userStore";

  const userStore = useUserStore();
</script>
