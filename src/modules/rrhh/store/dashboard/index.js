import { defineStore } from 'pinia';

import state from './state';
import actions  from "./actions";
import * as getters from "./getters";

export const useRrhhStoreDashboard = defineStore('rrhh_dashboard',{
    state,
    actions,
    getters
})