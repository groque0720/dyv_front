import { defineStore } from 'pinia';

import state from './state';
import actions  from "./actions";
import * as getters from "./getters";

export const useSindicatoStore = defineStore('sindicato',{
    state,
    actions,
    getters
})