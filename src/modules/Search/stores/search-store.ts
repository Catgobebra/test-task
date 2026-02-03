import {makeAutoObservable, reaction} from 'mobx'

const STORAGE_KEY = 'search-v1'

class SearchStore {
    search: string = ''
    debouncedQuery: string = ''

    constructor() {
        makeAutoObservable(this)
        this.loadFromStorage()
        this.initDebounce()
    }

    setSearch(searchQuery : string) {
        this.search = searchQuery
        this.saveToStorage()
    }

    get query() {
        return this.search
    }

    clear() {
        this.search = ''
        this.debouncedQuery = ''
        this.saveToStorage()
    }

    private initDebounce = () => {
    reaction(
      () => this.search,
      (query) => {
        const timer = setTimeout(() => {
          this.debouncedQuery = query.trim()
        }, 450)
        return () => clearTimeout(timer);
      },
      { delay: 450 }
    );
    };

    private saveToStorage() {
        try {
        const data = {
            search: this.search,
            debouncedQuery: this.debouncedQuery,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
        catch (err) {
            console.warn('Не удалось сохранить поиск:', err);
        }
    }

    private loadFromStorage() {
        try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const data = JSON.parse(saved);

        this.search = typeof data.search === 'string' ? data.search : '';;
        this.debouncedQuery = typeof data.debouncedQuery === 'string' ? data.debouncedQuery : '';;

        } catch (err) {
        console.warn('Не удалось загрузить сохранённый поиск:', err);
        }
    }
}

export default new SearchStore()