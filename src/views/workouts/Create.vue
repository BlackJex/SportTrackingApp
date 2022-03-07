<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <!-- Status Message -->
        <div 
            v-if="statusMsg || errorMsg" 
            class="mb-10 p-4 bg-light-gray-500 rounded-md shadow-lg">
            <p class="text-light-green-300">
                {{ statusMsg }}
            </p>
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>
        <!-- Form -->
        <div class="p-8 flex items-start bg-light-gray-500 rounded-md shadow-lg">
            <form method="POST" class="flex flex-col space-y-5 w-full" @submit.prevent="createWorkout">
                <h1 class="text-2xl text-light-green-300">
                    Record Workout
                </h1>
                <!-- Name -->
                <div class="flex flex-col mb-2">
                    <label for="name" class="mb-1 text-sm text-light-green-300">Name</label>
                    <input 
                        type="text" name="name" id="name" v-model="fields.name"
                        class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
                </div>
                <!-- Type -->
                <div class="flex flex-col mb-2">
                    <label for="type" class="mb-1 text-sm text-light-green-300">Type</label>
                    <div class="relative w-full" name="type">
                        <button 
                            @click.prevent="dropdownMenu = !dropdownMenu"
                            class="w-full bg-white p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 flex justify-between items-center space-x-5">
                            <span class="capitalize">{{ fields.type ? fields.type : 'Select workout' }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current duration-300" :class="{'transform rotate-180' : dropdownMenu}"><path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"/></svg>
                        </button>
                        <div v-if="dropdownMenu" class="absolute z-20 mt-2 w-full max-h-32 h-auto overflow-x-hidden overflow-y-auto overscroll-contain bg-white mt-2 rounded-md border flex flex-col">
                            <button
                                v-for="(t, i) in types"
                                :key="i"
                                @click.prevent="selectType(t)"
                                class="px-4 py-2 duration-300 text-left"
                                :class="fields.type === t ? 'text-white bg-light-green-300 hover:bg-light-green-500' : 'bg-white hover:bg-gray-300'"
                            >
                                <span class="capitalize">{{ t }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Strength Exercises -->
                <div 
                    v-if="fields.type === 'strength'" 
                    class="flex flex-col space-y-4 ">
                    <div
                        v-for="(e, i) in fields.exercises" 
                        :key="i"
                        class="flex flex-col w-full space-y-2 relative md:flex-row md:space-y-0 md:space-x-6">
                        <!-- Exercise Name -->
                        <div class="flex flex-col md:w-1/2">
                            <label for="name" class="mb-1 text-sm text-light-green-300">Exercise</label>
                            <input 
                                type="text" name="name" id="name" v-model="e.name"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
                        </div>
                        <!-- Sets -->
                        <div class="flex flex-col flex-1">
                            <label for="sets" class="mb-1 text-sm text-light-green-300">Sets</label>
                            <input 
                                type="text" name="sets" id="sets" v-model="e.sets"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <!-- Reps -->
                        <div class="flex flex-col flex-1 ">
                            <label for="reps" class="mb-1 text-sm text-light-green-300">Reps</label>
                            <input 
                                type="text" name="reps" id="reps" v-model="e.reps"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <!-- Weight -->
                        <div class="flex flex-col flex-1">
                            <label for="weight" class="mb-1 text-sm text-light-green-300">Weight</label>
                            <input 
                                type="text" name="weight" id="weight" v-model="e.weight"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <div class="flex flex-col items-center justify-center">
                            <button
                                v-if="i > 0"
                                @click.prevent="deleteExercise(i)" 
                                class="p-1 text-red-500" title="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                            </button>
                        </div> 
                        
                    </div>
                    <button 
                        @click.prevent="addExercise"
                        type="button"
                        class="mt-6 py-2 px-6 rounded-md self-start text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                        Add exercise
                    </button>
                </div>
                <!-- Cardio Exercises -->
                <div 
                    v-if="fields.type === 'cardio'" 
                    class="flex flex-col space-y-4 ">
                    <div
                        v-for="(e, i) in fields.exercises" 
                        :key="i"
                        class="flex flex-col w-full space-y-2 relative md:flex-row md:space-y-0 md:space-x-6">
                        <!-- cardioType -->
                        <div class="flex flex-col md:w-1/2">
                            <label for="type" class="mb-1 text-sm text-light-green-300">Type</label>
                            <select 
                                name="type" id="type" v-model="e.type"
                                class="p-2 bg-white text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
                                <option value="run">Run</option>
                                <option value="walk">Walk</option>
                            </select>
                        </div>
                        <!-- Distance -->
                        <div class="flex flex-col flex-1">
                            <label for="distance" class="mb-1 text-sm text-light-green-300">Distance</label>
                            <input 
                                type="text" name="distance" id="distance" v-model="e.distance"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <!-- Duration -->
                        <div class="flex flex-col flex-1 ">
                            <label for="duration" class="mb-1 text-sm text-light-green-300">Duration</label>
                            <input 
                                type="text" name="duration" id="duration" v-model="e.duration"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <!-- Pace -->
                        <div class="flex flex-col flex-1">
                            <label for="pace" class="mb-1 text-sm text-light-green-300">Pace</label>
                            <input 
                                type="text" name="pace" id="pace" v-model="e.pace"
                                class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        </div> 
                        <div class="flex flex-col items-center justify-center">
                            <button
                                v-if="i > 0"
                                @click.prevent="deleteExercise(i)" 
                                class="p-1 text-red-500" title="delete">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                            </button>
                        </div> 
                    </div>
                    <button 
                        @click.prevent="addExercise"
                        type="button"
                        class="mt-6 py-2 px-6 rounded-md self-start text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                        Add exercise
                    </button>
                </div>
                
                <button 
                    type="submit"
                    class="mt-6 py-2 px-6 rounded-md self-end text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                    Save
                </button>
            </form>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity';
import { uid } from 'uid';
import { supabase } from '../../supabase/init';

export default {
    setup()
    {
        /**
         * 
         * Data
         * 
         */
        const fields = reactive({
            name: null,
            type: null,
            exercises: []
        });
        const types = ref(['strength', 'cardio']);
        const statusMsg = ref(null);
        const errorMsg = ref(null);
        const dropdownMenu = ref(false);

        /**
         * 
         * Methods
         * 
         */
        const closeMenu = () => 
        {
            dropdownMenu.value = false
        }

        const selectType = (value) => 
        {
            fields.type = value;
            closeMenu();
            fields.exercises = [];
            addExercise();
        }

        const addExercise = () => 
        {
            if(fields.type === 'strength')
            {
                return fields.exercises.push({
                    id: uid(),
                    name: '',
                    sets: '',
                    reps: '',
                    weight: ''
                });
            }
            else if(fields.type === 'cardio')
            {
                return fields.exercises.push({
                    id: uid(),
                    type: '',
                    distance: '',
                    duration: '',
                    pace: ''
                });
            }
        }

        const deleteExercise = (index) => 
        {
            if(fields.exercises.length > 1)
            {
               return fields.exercises.splice(index, 1);
            }

            errorMsg.value = 'Error: Cannot remove, need to at least have one exercise!';
            setTimeout( () => 
            {
                errorMsg.value = null;
            }, 5000);
        }

        const createWorkout = async () => 
        {
            try 
            {
                const { error } = await supabase
                .from('workouts')
                .insert([
                    fields
                ]);
                if (error) throw error;
                statusMsg.value = 'Success: workout created!';
                fields.name = '';
                fields.type = '';
                fields.exercises = [];
                setTimeout( () => 
                {
                    statusMsg.value = null;
                }, 5000);
            }
            catch(error)
            {
                errorMsg.value = `Error: ${error.message}`;
                setTimeout( () => 
                {
                    errorMsg.value = null;
                }, 5000);
            }
        }

        return {
            fields,
            types,
            dropdownMenu,
            statusMsg,
            errorMsg,
            closeMenu,
            selectType,
            addExercise,
            deleteExercise,
            createWorkout
        }
    }
}
</script>