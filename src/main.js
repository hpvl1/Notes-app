import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import { createApolloClient } from '@nhost/apollo';
import { NhostClient } from '@nhost/vue';
import { DefaultApolloClient } from '@vue/apollo-composable';

const nhost = new NhostClient({
  subdomain: 'gnmhtflmezlvrmictnjt',
  region: 'eu-central-1',
});

const apolloClient = createApolloClient({ nhost });

createApp(App).provide(DefaultApolloClient, apolloClient).use(nhost).mount('#app');
