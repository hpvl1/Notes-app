<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSignUpEmailPassword } from '@nhost/vue';

const router = useRouter();

const { signUpEmailPassword } = useSignUpEmailPassword();

const email = ref('');
const password = ref('');

let result = null;

async function register() {
  if (!email.value || !password.value) {
    return window.alert('Please fill in all fields!');
  }

  result = await signUpEmailPassword(email.value, password.value);

  if (result.isError) {
    return alert(result.error.message);
  }

  window.alert(
    'You have successfully registered! Please confirm your email and login with your account',
  );

  setTimeout(() => {
    router.push({
      name: 'Login',
    });
  }, 3000);
}
</script>

<template>
  <div class="ml-3 mr-3">
    <h1 class="text-4xl font-bold mb-8">Notes App</h1>

    <form @submit.prevent="register">
      <h3>Sign Up</h3>

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
          placeholder="Enter your password"
          class="block w-2/4 max-w-xl text-slate-800 px-4 py-2"
        />
      </label>

      <input
        type="submit"
        value="Sign Up"
        class="text-center w-1/5 min-w-min text-stone-50 bg-indigo-500 px-1 py-3 no-underline rounded-md cursor-pointer flex-none"
      />
    </form>
  </div>
</template>

<style scoped></style>
