<script setup>
const props = defineProps({
    room: {
        type: Object,
        required: true
    },

});

const emit = defineEmits(['show-detail-panel']);

</script>


<!-- <template>
    <v-card color="#f0f0f0" class="w-100 h-100" @click="$emit('show-detail-panel')">
        <div class="d-flex flex-no-wrap justify-space-between h-100">
            <div class="d-flex flex-column">
                <div>
                    <v-card-title class="text-headline-small">
                        {{ props.room.room_name }}
                    </v-card-title>

                    <v-card-subtitle>{{ props.room.room_code }}</v-card-subtitle>
                    <v-card-subtitle>{{ props.room.capacity }} Orang</v-card-subtitle>
                </div>

                <v-spacer></v-spacer>

                <v-card-actions>
                   
                    <slot name="actions"></slot>
                </v-card-actions>
            </div>

            <v-avatar class="ma-3" rounded="0" size="125">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" cover></v-img>
            </v-avatar>
        </div>
    </v-card>
</template> -->

<template>
    <v-card class="px-2 py-2 rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.15)] border hover:border-gray-400"
        elevation="0">



        <div class="flex flex-row flex-no-wrap justify-start items-center max-w-xl gap-6"
            @click="$emit('show-detail-panel')">

            <div class="flex-shrink-0 w-full md:w-[250px]">
                <v-img height="200px"
                    :src="props.room.image_url || 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
                    cover class="rounded-lg"></v-img>
            </div>

            <div class="flex flex-col">

                <h2 class="font-semibold m-0">
                    {{ props.room.room_name }}
                </h2>

                 <p class="text-sm text-gray-500 m-0">{{ props.room.room_code }}</p>

                <p class="text-sm text-gray-500 m-0">{{ props.room.description }}</p>

            

                <div class="flex gap-4 m-0">
                    <div class="flex items-center">
                        <v-icon icon="mdi-account-group" class="mr-4 text-gray-400"></v-icon>
                        <p class="text-sm text-gray-500">Kapasitas: {{ props.room.capacity }}</p>
                    </div>


                </div>

                <div>
                    <slot name="actions"></slot>
                </div>
            </div>

        </div>






    </v-card>
</template>

<style lang="scss" scoped></style>