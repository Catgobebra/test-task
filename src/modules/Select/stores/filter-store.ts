import {makeAutoObservable} from 'mobx'
import type { Filter } from '../../../types/employee'

class FilterStore {
    positions: Filter[] = []
    genders: Filter[] = []
    stack: Filter[] = []

    constructor() {
        makeAutoObservable(this)
    }

    togglePosition = (filter: Filter) => {
        if (this.positions.some(f => f.value === filter.value)) {
        this.positions = this.positions.filter(v => v.value !== filter.value)
        } else {
        this.positions = [...this.positions, filter]
        }
        console.log(this.AllFilter)
    }

    toggleGender = (filter: Filter) => {
        if (this.genders.some(f => f.value === filter.value)) {
        this.genders = this.genders.filter(v => v.value !== filter.value)
        } else {
        this.genders = [...this.genders, filter]
        }
        console.log(this.AllFilter)
    }

    toggleStack = (filter: Filter) => {
        if (this.stack.some(f => f.value === filter.value)) {
        this.stack = this.stack.filter(v => v.value !== filter.value)
        } else {
        this.stack = [...this.stack, filter]
        }
        console.log(this.AllFilter)
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
    }
    
}

export default new FilterStore()