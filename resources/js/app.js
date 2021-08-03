import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { App } from './pages/App.vue';

const httpLink = createHttpLink({
    uri: 'http://localhost/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

new Vue({
    el: '#app',
    apolloProvider,
    render: h => h(App),
});