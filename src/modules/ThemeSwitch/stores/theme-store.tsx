import {makeAutoObservable} from 'mobx'

export type ResolvedTheme = 'light' | 'dark'
export type Theme = ResolvedTheme | 'system'

class ThemeStore {
    theme: Theme = 'system'
    resolvedTheme: ResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    constructor() {
        makeAutoObservable(this)
        this.loadFromStorage()
        this.updateResolvedTheme()
    }

    private loadFromStorage() {
        const saved = localStorage.getItem('theme') as Theme | null
        if (saved && (saved === 'light' || saved === 'dark' || saved === 'system'))
            this.theme = saved
    }

    setTheme(newTheme: Theme) {
        this.theme = newTheme
        localStorage.setItem('theme', newTheme)
        this.updateResolvedTheme()
    }

    toggle() {
        if (this.theme === 'system') 
            this.setTheme(this.resolvedTheme === 'dark' ? 'light' : 'dark')
        else
            this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    }

    private updateResolvedTheme() {
        let newResolved: ResolvedTheme

        if (this.theme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            newResolved = prefersDark ? 'dark' : 'light'
        } else
            newResolved = this.theme
        
        if (this.resolvedTheme !== newResolved) {
            this.resolvedTheme = newResolved
            document.documentElement.classList.toggle('dark', newResolved === 'dark')
        }
    }

    get isDark() {
        return this.resolvedTheme === 'dark'
    }
}

export default new ThemeStore()