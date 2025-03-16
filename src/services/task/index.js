const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { taskService as local } from './task.service.local'
import { taskService as remote } from './task.service.remote'

function getEmptyTask() {
    return {
        title: '',
        status: 'new',
        importance: getRandomIntInclusive(1, 3),
        createdAt: Date.now(),
        lastTriedAt: null,
        triesCount: 0,
        doneAt: null,
        errors: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
        // pageIdx: 0
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const taskService = { getEmptyTask, getDefaultFilter, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.taskService = taskService
