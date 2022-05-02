<template>
  <div class="modal-background fade-in z-20 p-3" @click.self="$emit('on:close')">
      
      <div class="modal-container p-3" :class="clase">
          <slot name="header"/>
          <slot name="body"/>
          <slot name="footer"/>

          <!-- <slot name="exposed" :newTitle="newTitle"></slot> -->
        <!-- <slot>
            <div class="center">
            Esto aparecerá si no tenenemos contenido 
            </div>
        </slot> -->
        <!-- <button @click="$emit('on:close')">cerrar</button>
        <button @click="$emit('on:aceptar')">Aceptar</button> -->

      </div>

  </div>
</template>

<script>
export default {

    props:['title','clase'],
    setup( props, context ) {

        console.log( {props, context} )

        return {
            newTitle: props.title?.toUpperCase(),
            elPepe: () => console.log('el pepe')
        }

    }

}
</script>

<style scoped>
.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: flex-start;
    justify-content: center;
}

.modal-container {
    min-width: 250px;
    /* min-height: 250px; */
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 250px;
    height: 250px; */
    color: red;
}


.fade-in {
  animation: fadeIn ease-out 0.2s;
  -webkit-animation: fadeIn ease-out 0.2s;
  -moz-animation: fadeIn ease-out 0.2s;
  -o-animation: fadeIn ease-out 0.2s;
  -ms-animation: fadeIn ease-out 0.2s;
}

@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
</style>