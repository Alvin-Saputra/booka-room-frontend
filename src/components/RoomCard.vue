<script setup>
const props = defineProps({
    room: {
        type: Object,
        required: true
    },

});

const emit = defineEmits(['request-delete', 'request-update']);
</script>


<template>
    <v-card color="#f0f0f0" class="w-100 h-100">
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
                    <!-- <v-btn class="ms-2 mb-2" size="small" text="BOOK ROOM" variant="outlined"></v-btn> -->
                    <v-btn prepend-icon="$edit" color="primary" rounded flat variant="outlined"
                        @click="emit('request-update', props.room)">Update</v-btn>
                    <v-btn prepend-icon="$delete" color="red" rounded flat variant="outlined"
                        @click="emit('request-delete', props.room)">Delete</v-btn>
                </v-card-actions>
            </div>

            <v-avatar class="ma-3" rounded="0" size="125">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg" cover></v-img>
            </v-avatar>
        </div>
    </v-card>
</template>



<style lang="scss" scoped></style>