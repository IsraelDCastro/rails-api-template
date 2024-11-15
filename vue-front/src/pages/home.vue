<template>
	<div>
		<section class="bg-cta bg-cover bg-zinc-600 bg-center bg-no-repeat py-12 md:py-24">
			<div class="flex flex-col justify-center mx-auto w-full h-auto md:w-10/12 lg:w-6/12">
				<h3 class="mb-4 text-center text-white text-2xl md:text-3xl font-semibold">
					Do you want to get the best offers?
				</h3>
				<h6 class="mb-8 text-center text-white text-lg">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias
					aperiam assumenda cumque eligendi eum ex exercitationem, harum in modi
					molestiae officia qui quibusdam quo recusandae, repellat vel voluptas
					voluptatem?
				</h6>
				<div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
					<div class="relative w-full md:w-auto">
						<span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
							<i class="bi bi-envelope text-xl"></i>
						</span>
						<InputText type="email"
							class="pl-10 pr-4 py-2 rounded-md w-full md:w-auto bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="example@example.com" />
					</div>
					<Button class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
						Subscribe!
					</Button>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup></script>
