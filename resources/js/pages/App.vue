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
            subscribeToMore: {
                document: gql`
                    subscription messageCreated {
                        messageCreated {
                            id
                            message
                        }
                    }
                `,
                updateQuery: (previousResult, { subscriptionData }) => {
                    console.log(previousResult);
                    console.log(subscriptionData);

                    return {
                        messages: [
                            ...previousResult.messages,
                            subscriptionData.data.messageCreated,
                        ],
                    };
                },
            },
        },
    },
};
</script>

<style scoped>
</style>