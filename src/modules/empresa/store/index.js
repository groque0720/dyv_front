import { defineStore } from 'pinia';

import state from './state';
import actions  from "./actions";
import * as getters from "./getters";

export const useEmpresaStore = defineStore('empresa',{
    state,
    actions,
    getters
})