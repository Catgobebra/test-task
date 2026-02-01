import {makeAutoObservable, reaction} from 'mobx'

class SearchStore {
    search: string = ''
    debouncedQuery: string = ''

    constructor() {
        makeAutoObservable(this)
        this.initDebounce()
    }

    setSearch(searchQuery : string) {
        this.search = searchQuery
    }

    get query() {
        return this.search
    }

    clear() {
        this.search = ''
    }

    private initDebounce = () => {
    reaction(
      () => this.search,
      (query) => {
        const timer = setTimeout(() => {
          this.debouncedQuery = query.trim();
        }, 450);
        return () => clearTimeout(timer);
      },
      { delay: 450 }
    );
    };

}

export default new SearchStore()