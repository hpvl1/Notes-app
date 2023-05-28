<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignInEmailPassword } from '@nhost/vue';

const router = useRouter();

const { signInEmailPassword } = useSignInEmailPassword();

const email = ref('');
const password = ref('');

let result = null;

async function register() {
  if (!email.value || !password.value) {
    return window.alert('Please fill in all fields!');
  }

  result = await signInEmailPassword(email.value, password.value);

  if (result.isError) {
    return alert(result.error.message);
  }

  router.push({
    name: 'Home',
  });
}

async function onClickSignUp() {
  router.push({
    name: 'Signup',
  });
}
</script>

<template>
  <div class="ml-3 mr-3">
    <h1 class="text-4xl font-bold mb-8">Notes App</h1>

    <form @submit.prevent="register">
      <h3>Sign In or Sign Up</h3>

      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Email</span>
        <input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          class="block w-2/4 max-w-xl text-slate-800 px-4 py-2"
        />
      </label>

      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Password</span>
        <input
          type="password"
          v-model="password"
          placeholder="Enter your email"
          class="block w-2/4 max-w-xl text-slate-800 px-4 py-2"
        />
      </label>
      <div class="flex flex-nowrap items-center">
        <input
          type="submit"
          value="Sign In"
          class="mr-7 text-center min-w-min w-1/5 text-stone-50 bg-indigo-500 px-1 py-3 no-underline rounded-md cursor-pointer flex-none"
        />

        <input
          @click="onClickSignUp"
          value="Sign Up"
          class="text-center w-1/5 min-w-min text-stone-50 bg-indigo-500 px-1 py-3 no-underline rounded-md cursor-pointer flex-none"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
