<template>
    <div v-if="dataLoaded && data" class="container mx-auto px-4 py-10 max-w-4xl">
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
        <!-- General Workout Info -->
        <div class="flex flex-col items-center p-8 rounded-lg shadow-md bg-light-gray-500 relative">
            <router-link 
                :to="{name: 'Home'}"
                class="absolute left-2 top-2 h-7 w-7 rounded-full flex justify-center items-center bg-light-green-300 shadow-lg text-white border border-transparent hover:border-light-green-300 hover:text-light-green-300 hover:bg-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-3.5 fill-current"><path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
                
            </router-link>
            <div v-if="$store.state.user" class="flex absolute right-2 top-2 space-x-2">
                <!-- Delete -->
                <button 
                    v-if="!editMode"
                    @click.prevent="deleteWorkout"
                    class="h-7 w-7 rounded-full flex justify-center items-center bg-light-green-300 shadow-lg text-white border border-transparent hover:border-light-green-300 hover:text-light-green-300 hover:bg-white focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-3.5"><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                </button>
                <!-- Edit Btn -->
                <button 
                    @click.prevent="editWorkout"
                    class="h-7 w-7 rounded-full flex justify-center items-center bg-light-green-300 shadow-lg text-white border border-transparent hover:border-light-green-300 hover:text-light-green-300 hover:bg-white focus:outline-none">
                    <svg v-if="!editMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-3.5"><path d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-3.5"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                </button>
            </div>
            <!-- Cardio Img -->
            <img v-if="data.type === 'cardio'" src="@/assets/imgs/running-light-green.png" class="h-24 w-auto">
            <!-- Strength Img -->
            <img v-else src="@/assets/imgs/dumbbell-light-green.png" class="h-24 w-auto">

            <p class="mt-6 mb-1 px-3 py-1 text-sm text-white bg-light-green-300 shadow-md rounded-md">
                {{ data.type }}
            </p>
            <!-- Title -->
            <h1 v-if="!editMode" class="mt-8 mb-2 text-center text-xl text-light-green-300">
                {{ data.name }}
            </h1>
            <!-- Edit - Title -->
            <div v-else class="w-full mt-6 flex items-center justify-center">
                <input
                    type="text" name="name" id="name" v-model="data.name"
                    class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
            </div>
        </div>

        <!-- Exercises -->
        <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-gray-500 shadow-md">
            <!-- Strength Exercises -->
            <div v-if="data.type === 'strength'"
                class="flex flex-col sapce-y-4 w-full">
                <div
                    v-for="(e, i) in data.exercises" 
                    :key="i"
                    class="flex flex-col w-full space-y-2 relative md:flex-row md:space-y-0 md:space-x-6">
                    <!-- Name -->
                    <div class="flex flex-col md:w-1/2">
                        <label for="name" class="mb-1 text-sm text-light-green-300">Exercise</label>
                        <input 
                            v-if="editMode"
                            type="text" name="name" id="name" v-model="e.name"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.name }}
                        </h2>
                    </div>
                    <!-- Sets -->
                    <div class="flex flex-col flex-1">
                        <label for="sets" class="mb-1 text-sm text-light-green-300">Sets</label>
                        <input 
                            v-if="editMode"
                            type="text" name="sets" id="sets" v-model="e.sets"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.sets }}
                        </h2>
                    </div> 
                    <!-- Reps -->
                    <div class="flex flex-col flex-1 ">
                        <label for="reps" class="mb-1 text-sm text-light-green-300">Reps</label>
                        <input 
                            v-if="editMode"
                            type="text" name="reps" id="reps" v-model="e.reps"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.reps }}
                        </h2>
                    </div> 
                    <!-- Weight -->
                    <div class="flex flex-col flex-1">
                        <label for="weight" class="mb-1 text-sm text-light-green-300">Weight</label>
                        <input 
                            v-if="editMode"
                            type="text" name="weight" id="weight" v-model="e.weight"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.weight }}
                        </h2>
                    </div> 
                    <div class="flex flex-col items-center justify-center">
                        <button
                            v-if="i > 0 && editMode"
                            @click.prevent="deleteExercise(i)" 
                            class="p-1 text-red-500" title="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                        </button>
                    </div>    
                </div>
            </div>
            <!-- Cardio Exercises -->
            <div v-if="data.type === 'cardio'"
                class="flex flex-col sapce-y-4 w-full">
                <div
                    v-for="(e, i) in data.exercises" 
                    :key="i"
                    class="flex flex-col w-full space-y-2 relative md:flex-row md:space-y-0 md:space-x-6">
                    <!-- Type -->
                    <div class="flex flex-col md:w-1/2">
                        <label for="name" class="mb-1 text-sm text-light-green-300">Type</label>
                        <select 
                            v-if="editMode"
                                name="type" id="type" v-model="e.type"
                                class="p-2 bg-white text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
                                <option value="run">Run</option>
                                <option value="walk">Walk</option>
                            </select>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300 capitalize">
                            {{ e.type }}
                        </h2>
                    </div>
                    <!-- Distance -->
                    <div class="flex flex-col flex-1">
                        <label for="distance" class="mb-1 text-sm text-light-green-300">Distance</label>
                        <input 
                            v-if="editMode"
                            type="text" name="distance" id="distance" v-model="e.distance"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.distance }}
                        </h2>
                    </div> 
                    <!-- Duration -->
                    <div class="flex flex-col flex-1 ">
                        <label for="duration" class="mb-1 text-sm text-light-green-300">Duration</label>
                        <input 
                            v-if="editMode"
                            type="text" name="duration" id="duration" v-model="e.duration"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.duration }}
                        </h2>
                    </div> 
                    <!-- Pace -->
                    <div class="flex flex-col flex-1">
                        <label for="pace" class="mb-1 text-sm text-light-green-300">Pace</label>
                        <input 
                            v-if="editMode"
                            type="text" name="pace" id="pace" v-model="e.pace"
                            class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300 w-full" required>
                        <h2 v-else class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 bg-light-gray-500 rounded-md duration-300">
                            {{ e.pace }}
                        </h2>
                    </div> 
                    
                    <div class="flex flex-col items-center justify-center">
                        <button
                            v-if="i > 0 && editMode"
                            @click.prevent="deleteExercise(i)" 
                            class="p-1 text-red-500" title="delete">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 fill-current"><path d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                        </button>
                    </div>    
                </div>
            </div>
            <button 
                v-if="editMode"
                @click.prevent="addExercise"
                type="button"
                class="mt-6 py-2 px-6 rounded-md self-start text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                Add exercise
            </button>
        </div>

        <button 
                v-if="editMode"
                type="submit"
                @click.prevent="updateWorkout"
                class="mt-6 py-2 px-6 rounded-md self-start text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                Update Workout
            </button>

    </div>
    <div v-else class="container mt-10 px-4 mx-auto flex items-center justify-center">
        <div class="h-32 w-32 min-w-32 border-t-2 border-light-green-300 rounded-full animate-spin"></div>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { uid } from 'uid';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../../supabase/init';
export default 
{
    setup()
    {
        /** 
         * 
         * Data
         * 
         */
        const route = useRoute();
        const router = useRouter();
        const data = ref(null);
        const dataLoaded = ref(false);
        const errorMsg = ref(null);
        const statusMsg = ref(null);
        const store = useStore();
        const editMode = ref(false);

        /** 
         * 
         * Methods
         * 
         */
        const getData = async() => 
        {
            try 
            {
                const { data: workouts, error } = await supabase
                .from('workouts')
                .select("*")
                .eq('id', route.params.id);

                if(error) throw error;
                data.value = workouts[0];
                dataLoaded.value = true;
            }
            catch(e)
            {
                errorMsg.value = e.message;
                setTimeout( () => 
                {
                    errorMsg.value = null;
                }, 5000);
            }
        };

        const editWorkout = () => 
        {
            editMode.value = !editMode.value
        }

        const addExercise = () => 
        {
            if(data.value.type === 'strength')
            {
                return data.value.exercises.push({
                    id: uid(),
                    name: '',
                    sets: '',
                    reps: '',
                    weight: ''
                });
            }
            else if(data.value.type === 'cardio')
            {
                return data.value.exercises.push({
                    id: uid(),
                    type: '',
                    distance: '',
                    duration: '',
                    pace: ''
                });
            }
            console.log(data.value.exercises)
        }

        const deleteExercise = (index) => 
        {
            if(data.value.exercises.length > 1)
            {
               return data.value.exercises.splice(index, 1);
            }

            errorMsg.value = 'Error: Cannot remove, need to at least have one exercise!';
            setTimeout( () => 
            {
                errorMsg.value = null;
            }, 5000);
        }

        const deleteWorkout = async() =>
        {
            try 
            {   
                const { error } = await supabase.from('workouts')
                                    .delete()
                                    .eq('id', route.params.id);
                if(error) throw(error);
                return router.push({name:'Home'});
            }
            catch(e)
            {
                errorMsg.value = `Error: ${e.message}`;
                setTimeout( () => 
                {
                    errorMsg.value = false;
                }, 5000);
            }
        }

        const updateWorkout = async () => 
        {
            try 
            {   
                const { error } = await supabase.from('workouts')
                                    .update({
                                        name: data.value.name,
                                        exercises: data.value.exercises
                                    })
                                    .eq('id', route.params.id);
                if(error) throw(error);
                statusMsg.value = "Success: Workout updated!";
                editMode.value = false;
                setTimeout( () => 
                {
                    statusMsg.value = false;
                }, 5000);
            }
            catch(e)
            {
                errorMsg.value = `Error: ${e.message}`;
                setTimeout( () => 
                {
                    errorMsg.value = false;
                }, 5000);
            }
        }

        /** 
         * 
         * Hooks
         * 
         */
        getData();

        return {
            data,
            store,
            dataLoaded,
            errorMsg,
            statusMsg,
            editMode,
            editWorkout,
            addExercise,
            deleteExercise,
            deleteWorkout,
            updateWorkout
        }

    }
}
</script>