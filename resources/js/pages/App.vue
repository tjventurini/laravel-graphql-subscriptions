<template>
    <div>
        <h1 class="text-lg font-bold mb-4">Messages</h1>

        <ul>
            <li v-for="message in messages" :key="message.id">
                {{ message.message }}
            </li>
        </ul>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    name: "App",
    data() {
        return {
            messages: [],
        };
    },
    apollo: {
        messages: {
            query: gql`
                query Messages {
                    messages {
                        id
                        message
                    }
                }
            `,
        },
        // $subscribe: {
        //     messageCreated: gql`
        //         subscription messageCreated {
        //             messageCreated {
        //                 id
        //                 message
        //             }
        //         }
        //     `,
        //     result({ data }) {
        //         console.log(data.messageCreated);
        //     },
        // },
    },
};
</script>

<style scoped>
</style>