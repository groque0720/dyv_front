><template>
    <div>
        <div class="flex justify-between items-center pb-1">

            <span class=" font-semibold"> Lista de Sucursales </span>

            <div class="py-1">
                <a class="text-indigo-500 cursor-pointer hover:font-extrabold "
                    @click.prevent="router.push({ name: 'sucursal_create' })">
                    <i class="icon-nuevo"></i>
                    <span>Nueva Sucursal</span> 
                </a>
            </div>
        </div>
        <div  class="mt-2 w-full border shadow p-3 rounded">
            <table>
                <thead>
                    <tr>
                        <th>Sucursal</th>
                        <th>Dirección</th>
                        <th>Casa Central</th>
                        <th></th>
                    </tr> 
                </thead>
                <tbody>
                    <template v-for="( sucursal, idx ) in empresaForm.sucursals" :key="sucursal.id">
                        <tr @click="onclickSucursal( idx, sucursal.id )">
                            <td>{{ sucursal.nombre }}</td>
                            <td>{{ sucursal.direccion }}</td>
                            <td><div class="text-center">{{ sucursal.central ? 'Si' : 'No' }}</div></td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
     
    </div>
</template>

<script>
import { useEmpresaStore } from "../store"
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
    setup() {
        const empresaStore = useEmpresaStore();
        const router = useRouter();

        const onclickSucursal = (idx, sucursal_id) => {
            empresaStore.sucursal = empresaStore.empresa.sucursals[ idx ]
            router.push({ name: "sucursal_show", params: { sucursal_id } })
        }
        
        return {
            router,
            empresaForm: computed(() => empresaStore.empresa),
            onclickSucursal
        };
    },
}
</script>