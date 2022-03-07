<template>
  <div v-if="dataLoaded" class="container mt-10 px-4 mx-auto">
    <!-- No Data -->
    <div v-if="data.length === 0" class="w-full flex flex-col space-y-10 items-center">
      <h1 class="text-xl">
        Looks empty here
      </h1>
      <router-link 
        class="px-4 py-2 rounded-md bg-light-green-300 text-white border border-transparent hover:bg-white hover:text-light-green-300 hover:border-light-green-300 duration-300 focus:outline-none"
        :to="{name: 'WorkoutsCreate'}">
        Create Workout
      </router-link>
    </div>
    <!-- Data -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <router-link 
        v-for="(w, i) in data"
        :key="i"
        :to="{name: 'WorkoutsShow', params:{ id: w.id }}"
        class="flex flex-col items-center bg-light-gray-500 p-8 shadow hover:shadow-xl duration-300 rounded-md">
        <!-- Cardio Img -->
        <img v-if="w.type === 'cardio'" src="@/assets/imgs/running-light-green.png" class="h-24 w-auto">
        <!-- Strength Img -->
        <img v-else src="@/assets/imgs/dumbbell-light-green.png" class="h-24 w-auto">

        <p class="mt-6 mb-1 px-3 py-1 text-xs text-white bg-light-green-300 shadow-md rounded-md">
          {{ w.type }}
        </p>
        <h1 class="mt-8 mb-2 text-center text-xl text-light-green-300">
          {{ w.name }}
        </h1>
      </router-link>

    </div>
  </div>
  <div v-else class="container mt-10 px-4 mx-auto flex items-center justify-center">
    <div class="h-32 w-32 min-w-32 border-t-2 border-light-green-300 rounded-full animate-spin"></div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { supabase } from '../supabase/init';
export default {
  name: 'Home',
  setup()
  {
    const data = ref([]);
    const dataLoaded = ref(false);

    const getData = async() => 
    {
      try 
      {
        let { data: workouts, error } = await supabase
        .from('workouts')
        .select('*');
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
      }
      catch(e)
      {
        console.warn(e.message)
      }
    };

    getData();

    return {
      data,
      dataLoaded
    }
  }
}
</script>
