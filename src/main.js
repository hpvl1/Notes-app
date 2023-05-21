import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createApolloClient } from '@nhost/apollo';
import { NhostClient } from '@nhost/vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

import router from './router';

const nhost = new NhostClient({
  subdomain: 'gnmhtflmezlvrmictnjt',
  region: 'eu-central-1',
});

const apolloClient = createApolloClient({ nhost });

const app = createApp(App);

app.provide(DefaultApolloClient, apolloClient);
app.use(nhost);
app.use(router);
app.mount('#app');
