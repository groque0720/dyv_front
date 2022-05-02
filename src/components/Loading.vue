<template>
  <div class="fade-out w-full h-full flex items-center justify-center">
      
    <div class="flex justify-between items-center gap-6" >
        <i class="fas fa-spinner animate-spin text-2xl text-indigo-500"></i>
        <span>Espere por favor...</span>
    </div>

  </div>
</template>

<style scoped>
.fade-out {
  animation: fadeOut ease-out 0.2s;
  -webkit-animation: fadeOut ease-out 0.2s;
  -moz-animation: fadeOut ease-out 0.2s;
  -o-animation: fadeOut ease-out 0.2s;
  -ms-animation: fadeOut ease-out 0.2s;
}

@keyframes fadeOut {
  0% {opacity:1;}
  100% {opacity:0;}
}

@-moz-keyframes fadeOut {
  0% {opacity:1;}
  100% {opacity:0;}
}

@-webkit-keyframes fadeOut {
  0% {opacity:1;}
  100% {opacity:0;}
}

@-o-keyframes fadeOut {
  0% {opacity:1;}
  100% {opacity:0;}
}

@-ms-keyframes fadeOut {
  0% {opacity:1;}
  100% {opacity:0;}
}
</style>