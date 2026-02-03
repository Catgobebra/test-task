import {makeAutoObservable} from 'mobx'
import type { Filter } from '../../../types/employee'

const STORAGE_KEY = 'filter-v1'

class FilterStore {
    positions: Filter[] = []
    genders: Filter[] = []
    stack: Filter[] = []

    constructor() {
        makeAutoObservable(this)
        this.loadFromStorage()
    }

    togglePosition = (filter: Filter) => {
        if (this.positions.some(f => f.value === filter.value)) {
        this.positions = this.positions.filter(v => v.value !== filter.value)
        } else {
        this.positions = [...this.positions, filter]
        }
        console.log(this.AllFilter)
        this.saveToStorage()
    }

    toggleGender = (filter: Filter) => {
        if (this.genders.some(f => f.value === filter.value)) {
        this.genders = this.genders.filter(v => v.value !== filter.value)
        } else {
        this.genders = [...this.genders, filter]
        }
        console.log(this.AllFilter)
        this.saveToStorage()
    }

    toggleStack = (filter: Filter) => {
        if (this.stack.some(f => f.value === filter.value)) {
        this.stack = this.stack.filter(v => v.value !== filter.value)
        } else {
        this.stack = [...this.stack, filter]
        }
        console.log(this.AllFilter)
        this.saveToStorage()
    }

    get AllFilter() {
        return [...this.stack,...this.positions,...this.genders]
    }

    getFilterValues(filterType: 'position' | 'gender' | 'stack'): string[] {
        switch (filterType) {
            case 'position':
            return this.positions.map(x => x.value);
            case 'gender':
            return this.genders.map(x => x.value);
            case 'stack':
            return this.stack.map(x => x.value);
            default:
            return [];
        }
    }

    get activeFiltersCount() {
        return this.positions.length + this.genders.length + this.stack.length
    }

    get hasAnyFilter() {
        return this.activeFiltersCount > 0
    }

    removeFilter = (filterToRemove: Filter) => {
        switch (filterToRemove.type) {
        case 'position':
            this.positions = this.positions.filter(f => f.value !== filterToRemove.value);
            break;
        case 'gender':
            this.genders = this.genders.filter(f => f.value !== filterToRemove.value);
            break;
        case 'stack':
            this.stack = this.stack.filter(f => f.value !== filterToRemove.value);
            break;
            }
        this.saveToStorage()
    }
    private saveToStorage() {
        try {
        const data = {
            positions: this.positions,
            genders:   this.genders,
            stack:     this.stack,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        catch (err) {
            console.warn('Не удалось сохранить фильтры:', err);
        }
    }
    private loadFromStorage() {
        try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const data = JSON.parse(saved);

        this.positions = Array.isArray(data.positions) ? data.positions : [];
        this.genders   = Array.isArray(data.genders)   ? data.genders   : [];
        this.stack     = Array.isArray(data.stack)     ? data.stack     : [];

        } catch (err) {
        console.warn('Не удалось загрузить сохранённые фильтры:', err);
        }
    }
}

export default new FilterStore()