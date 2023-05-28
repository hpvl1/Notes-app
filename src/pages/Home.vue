<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useSignOut, useUserId } from '@nhost/vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

const router = useRouter();

const { signOut } = useSignOut();
const userId = useUserId();

const newNote = reactive({
  title: '',
  content: '',
});

function logout() {
  signOut();

  router.push({
    name: 'Login',
  });
}

function convertDate(date) {
  return new Date(date).toLocaleString();
}

function convertToHTML(content) {
  return content.replace(/\n/g, '<br>');
}

const {
  loading: notesLoading,
  result: notesResult,
  refetch: notesRefetch,
} = useQuery(
  gql`
    query ($userId: String!) {
      notes(order_by: { createdAt: desc }, where: { user_id: { _eq: $userId } }) {
        id
        title
        content
        createdAt
      }
    }
  `,
  {
    userId: userId.value,
  },
);

const { mutate: createNote, onDone: createNoteDone } = useMutation(gql`
  mutation ($userId: String!, $title: String!, $content: String!) {
    insert_notes_one(object: { content: $content, title: $title, user_id: $userId }) {
      id
    }
  }
`);

const { mutate: deleteNote, onDone: deleteNoteDone } = useMutation(gql`
  mutation ($id: Int!) {
    delete_notes(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`);

deleteNoteDone(() => {
  notesRefetch();
});

function handleCreateNote() {
  if (!newNote.title || !newNote.content) return alert('Please provide a title and content');

  createNote({
    userId: userId.value,
    title: newNote.title,
    content: newNote.content,
  });
}

createNoteDone(() => {
  notesRefetch();
  newNote.title = '';
  newNote.content = '';
});
</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Notes App</h1>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>

    <form @submit.prevent="handleCreateNote" class="mb-8">
      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Title</span>
        <input
          type="text"
          v-model="newNote.title"
          placeholder="Enter the title of the note"
          class="block w-full text-slate-800 px-4 py-2"
      /></label>

      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Content</span>
        <textarea
          v-model="newNote.content"
          placeholder="Write your content here"
          class="block w-full text-slate-800 px-4 py-2 h-32"
        ></textarea>
      </label>

      <input
        type="submit"
        value="Create note"
        class="text-stone-50 bg-indigo-500 px-5 py-3 no-underline rounded-md cursor-pointer"
      />
    </form>

    <div v-if="!notesLoading">
      <div
        v-for="note in notesResult.notes"
        class="relative bg-white text-slate-700 rounded-lg p-6 mb-6"
      >
        <button
          class="absolute top-[43%] right-6 text-stone-50 bg-red-600 px-9 py-3 rounded-full font-bold"
          @click="() => deleteNote({ id: note.id })"
        >
          Delete
        </button>
        <h3 class="font-bold text-2xl mb-4">{{ note.title }}</h3>
        <p class="text-lg text-gray-500 mb-4" v-html="convertToHTML(note.content)"></p>
        <div class="text-sm text-gray-500 italic">{{ convertDate(note.createdAt) }}</div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
