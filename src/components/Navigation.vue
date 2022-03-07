<template>
  <header class="bg-light-green-300 text-white">
    <nav class="container py-5 px-4 flex flex-col space-y-4 items-center sm:flex-row sm:space-x-4 sm:space-y-0 mx-auto">
      <div class="flex items-center space-x-4">
        <img src="../assets/imgs/dumbbell-light.png" class="w-14" alt="">
        <h1 class="text-lg"> Active Tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end space-x-10">
        <router-link class="hover:underline" :to="{name: 'Home'}">Home</router-link>
        <router-link v-if="$store.state.user" class="hover:underline" :to="{name: 'WorkoutsCreate'}">Create</router-link>
        <router-link v-if="!$store.state.user" class="hover:underline" :to="{name: 'Signin'}">Login</router-link>
        <router-link v-if="!$store.state.user" class="hover:underline" :to="{name: 'Signup'}">Signup</router-link>
        <li
          v-if="$store.state.user"
          @click.prevent="logout" 
          class="cursor-pointer hover:underline">
          Logout
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';
import { supabase } from '../supabase/init';
export default {
  setup()
  {
    const router = useRouter();

    const logout = async () => 
    {
      await supabase.auth.signOut();
      router.push({ name: 'Home' });
    }

    return {
      logout
    };
  }
}
</script>
