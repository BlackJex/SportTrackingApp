<template>
 <div v-if="appReady" class="min-h-full box-border font-poppins">
    <Navigation />
    <router-view/>
 </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';

import Navigation from './components/Navigation.vue';
import {supabase} from './supabase/init';
export default {
  components: { Navigation },
  setup()
  {
    /**
     * 
     * Data 
     * 
     */
    const appReady = ref(null);
    const user = supabase.auth.user();
    const store = useStore();
    

    /**
     * 
     * Hooks 
     * 
     */
    if(!user) appReady.value = true;
    supabase.auth.onAuthStateChange((_, session) => 
    {
      store.commit('SET_USER', session);
      appReady.value = true;
    });

    return {
      appReady
    };
  }

}
</script>
