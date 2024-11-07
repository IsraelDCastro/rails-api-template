<template>
  <div>
    <section class="section">
      <div class="flex flex-wrap justify-between items-start">
        <h2 class="title">
          Recent <span class="text-primary-700">products</span>
        </h2>
        <router-link to="/shop" class="button button-tertiary-outline is-small"
          >Explore shop</router-link
        >
      </div>
    </section>
    <section class="bg-center bg-no-repeat bg-cover bg-cta section">
      <div
        class="flex flex-col justify-center mx-auto w-full h-auto md:w-10/12 md:h-96 lg:w-6/12"
      >
        <h3 class="mb-4 text-center text-white">
          Do you want to get the best offers?
        </h3>
        <h6 class="mb-8 text-center text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias
          aperiam assumenda cumque eligendi eum ex exercitationem, harum in modi
          molestiae officia qui quibusdam quo recusandae, repellat vel voluptas
          voluptatem?
        </h6>
        <div
          class="flex justify-center items-center space-y-4 md:space-y-0 md:space-x-4 field has-icon"
        >
          <div class="input-icon">
            <span class="icon"><i class="text-xl bi bi-envelope"></i></span>
            <input
              type="email"
              class="input"
              placeholder="example@example.com"
            />
          </div>
          <button class="button button-primary">Subscribe!</button>
        </div>
      </div>
    </section>
    <section class="section">
      <h2 class="title">Recent <span class="text-primary-700">blogs</span></h2>
    </section>
  </div>
</template>

<script setup></script>
