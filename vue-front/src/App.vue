<template>
  <main>
    <Navbar />
    <div class="wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </main>
</template>
<script setup>
import Navbar from "@/layouts/navbar.vue";
import Footer from "@/layouts/footer.vue";
</script>
