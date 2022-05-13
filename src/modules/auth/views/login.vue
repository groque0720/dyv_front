<template>
    
    <div class="w-full mt-20">
        <form class="space-y-6" action="#" @submit.prevent="onSubmit()">
            <div class="w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 m-auto p-4 border-2 rounded-lg shadow-sm bg-white bg-opacity-80">
                <div class="form-row flex justify-center">
                    <img class="w-9/12" src="../../../assets/logo-dyv.png" alt="">
                </div>
                <div class="form-row">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" v-model="userForm.email" class="form-input" name="email" placeholder="Ingrese su correo" required="">
                </div>
                <div class="form-row">
                    <label for="password" class="form-label">password</label>
                    <input type="password" v-model="userForm.password" class="form-input" name="password" placeholder="••••••••">
                </div>
                <div class="form-row flex justify-end">
                    <button class="btn" >Acceder</button>
                </div>
            </div>
        </form>
                <!-- <div class="form-row flex justify-end">
                    <button class="btn" @click="acciones()">COmprobar JWT {{ authStore.user }}</button>
                </div> -->
                <!-- <div class="form-row flex justify-end">
                    <button class="btn" @click="validarJWT()">COmprobar JWT</button>
                </div> -->
       
    </div>

</template>

<script>

import { ref } from "vue";
import  { useAuthStore } from '../store';
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";
// import { mapActions } from "pinia";

export default {
    setup() {
        const router = useRouter();
        const authStore = useAuthStore(); 
        const { signInUser } = authStore;

        const userForm = ref({
            email: '',
            password: ''
        });


        return {
            authStore,
            userForm,
            onSubmit: async() => {
                const { ok, message } = await signInUser( userForm.value )
                if( !ok ) Swal.fire("Error", message, "error")
                else router.push({name: 'Home' })
            }
        }

    },
    methods: {

        // ...mapActions(useAuthStore,['acciones']),

        // async validarJWT(){
        //     const { ok, message } = await this.checkAuthentication()
        //     if( !ok ) {
        //          Swal.fire("Error", message, "error")
        //     } else Swal.fire("Success", message, "success")
        // }
    },
    computed:{

    }
    
    
}
</script>