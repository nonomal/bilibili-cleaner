import { ISubFilter, SelectorFn } from '../core'

export class StringFilter implements ISubFilter {
    isEnable = false
    private strSet = new Set<string>()

    enable(): void {
        this.isEnable = true
    }
    disable(): void {
        this.isEnable = false
    }
    addParam(value: string): void {
        value = value.trim()
        value && this.strSet.add(value)
    }
    setParam(value: string[]): void {
        this.strSet = new Set(value.map((v) => v.trim()).filter((v) => v))
    }
    check(el: HTMLElement, selectorFn: SelectorFn): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!this.isEnable) {
                resolve()
                return
            }
            const value = selectorFn(el)
            console.log('stringFilter', value, this.strSet)
            if (typeof value === 'string' && this.strSet.has(value.trim())) {
                reject()
                return
            }
            resolve()
        })
    }
}
