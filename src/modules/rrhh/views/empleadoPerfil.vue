<template>
    <div class="p-3">


        <div class="flex items-center gap-2  border-b border-indigo-500">
            <i class="fas fa-user text-indigo-500 text-md"></i>
            <span class=" text-lg">Perfil</span>
        </div>
        
        <form action="" >
            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label for="">Nombre/s</label>
                    <input class="form-input" type="text">
                </div>
                <div class="flex-1">
                    <label for="">Apellido/s</label>
                    <input class="form-input" type="text">
                </div> 
                <div class="">
                    <label for="">Fecha Nacimiento</label>
                    <input class="form-input" type="date">
                </div>  
            </div>

            <div class="form-row flex justify-between gap-3">

                <div class="flex-1">
                    <label for="">Nro Documento</label>
                    <input class="form-input" type="text">
                </div>
                <div class="flex-1">
                    <label for="">CUIL</label>
                    <input class="form-input" type="text">
                </div>
                <div class="flex-1">
                    <label for="">Sexo</label>
                    <select class="form-select" name="" id="">
                        <option value="">Femenino</option>
                        <option value="">Masculino</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Estado Civil</label>
                    <select class="form-select" name="" id="">
                        <option value="">Casado</option>
                        <option value="">Soltero</option>
                    </select>
                </div>   
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label for="">Calle</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Nro</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Piso</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Dpto</label>
                    <input class="form-input" type="text">
                </div>
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class=" flex-1">
                    <label for="">Localidad</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Provincia</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">CP</label>
                    <input class="form-input" type="text">
                </div>
            </div>

            <div class="form-row flex justify-between gap-3">
                <div class="">
                    <label for="">Teléfono</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Celular</label>
                    <input class="form-input" type="text">
                </div>
                <div class="flex-1">
                    <label for="">Email</label>
                    <input class="form-input" type="text">
                </div>
            </div>
            <div class="form-row flex justify-between gap-3">
                <div class="">
                    <label for="">Nro Legajo</label>
                    <input class="form-input" type="text">
                </div>
                <div class="">
                    <label for="">Fecha Ingreso</label>
                    <input class="form-input" type="date">
                </div>
                <div class="flex-1">
                    <label for="">Nombre Usuario</label>
                    <input class="form-input" type="text">
                </div>   
            </div>
            <div class="form-row flex justify-between gap-3">
                <div class="flex-1">
                    <label for="">Empresa</label>
                    <select class="form-select" name="" id="">
                        <option value="">Empresa 1</option>
                        <option value="">Empresa 2</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Sucursal</label>
                    <select class="form-select" name="" id="">
                        <option value="">Sucursal 1</option>
                        <option value="">Sucursal 2</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Area</label>
                    <select class="form-select" name="" id="">
                        <option value="">Area 1</option>
                        <option value="">Area 2</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="">Categoria</label>
                    <select class="form-select" name="" id="">
                        <option value="">Categoria 1</option>
                        <option value="">Categoria 2</option>
                    </select>
                </div>
            </div>
            <div class="form-row flex justify-between border-t mt-2">
                <span class="form-btn-cancelar" type="text" @click.prevent="">Volver</span>
                <button class="form-btn-submit">Aceptar</button>
            </div> 


        </form>
    </div>
</template>