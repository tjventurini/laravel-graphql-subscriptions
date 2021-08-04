import Vue from 'vue';

import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// subscription imports
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// pusher
import Pusher from "pusher-js";
import PusherLink from './pusher-link';

import App from './pages/App';

const httpLink = new HttpLink({
    uri: 'http://localhost/graphql',
});

// const wsLink = new WebSocketLink({
//     uri: 'wss://ws-eu.pusher.com/app/a72fd1cd45a5f520c1f0?protocol=7',
//     options: {
//         reconnect: true,
//     },
// });

const pusherLink =
    new PusherLink({
        pusher: new Pusher('a72fd1cd45a5f520c1f0', {
            cluster: "eu",
            authEndpoint: 'http://localhost/graphql/subscriptions/auth',
            disableStats: true,
            // auth: {
            //     headers: {
            //         Authorization: token ? `Bearer ${token}` : ""
            //     }
            // }
        })
    });

// const link = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return definition.kind === 'OperationDefinition'
//             && definition.operation === 'subscription';
//     },
//     wsLink,
//     httpLink,
// );

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
    // link,
    // httpLink,
    link: ApolloLink.from([pusherLink, httpLink]),
    cache,
    connectToDevTools: true,
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