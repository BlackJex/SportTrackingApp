<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <div 
            v-if="errorMsg"
            class="mb-10 p-4 rounded-md bg-light-gray-500">
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>
        <!-- Signup Form -->
        <form
            method="POST"
            @submit.prevent="login" 
            class="p-8 flex flex-col bg-light-gray-500 rounded-md shadow-lg">
            <h1 class="text-3xl text-light-green-300 mb-4">
                Login
            </h1>
            <div class="flex flex-col mb-2">
                <label for="email" class="mb-1 text-sm text-light-green-300">Email</label>
                <input 
                    type="email" name="email" id="email" v-model="fields.email"
                    class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
            </div>
            <div class="flex flex-col mb-2">
                <label for="password" class="mb-1 text-sm text-light-green-300">Password</label>
                <input 
                    type="password" name="password" id="password" v-model="fields.password"
                    class="p-2 text-gray-500 focus:outline-none border border-light-gray-500 rounded-md hover:border-light-green-300 duration-300" required>
            </div>

            <button class="mt-6 py-2 px-6 rounded-md self-start text-sm bg-light-green-300 text-white border border-2 border-transparent hover:border-light-green-300 hover:bg-white hover:text-light-green-300 duration-300">
                Login
            </button>

            <router-link class="text-sm mt-6 text-center" :to="{name: 'Signup'}">
                Don't have an account? <span class="font-semibold text-light-green-300 hover:underline">Signup</span> 
            </router-link>
        </form>
    </div>
</template>
<script>
import { reactive, ref } from 'vue';
import { supabase } from '../../supabase/init';
import { useRouter } from 'vue-router';

export default {
    name:'Signin',
    setup()
    { 
        /** 
         *
         * Data
         *  
         */
        const fields = reactive({
            email: '',
            password: '' //CZCXnzQbPBIXMgutfdtx
        });
        const errorMsg = ref(null);
        const router = useRouter();

        /** 
         *
         * Methods
         *  
         */
        const login = async () => 
        {
            try 
            {
                let { error } = await supabase.auth.signIn({
                    email: fields.email,
                    password: fields.password
                });

                if(error) throw error;
                router.push({ name:'Home' });
            }
            catch(error)
            {
                errorMsg.value = `Error: ${error.message}`;
                setTimeout( () => 
                {
                    errorMsg.value = null;
                },5000);
            }
        }

        return {
            fields,
            errorMsg,
            login
        };
    }
}
</script>