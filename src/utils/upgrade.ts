import { GM_listValues, GM_getValue, GM_setValue, GM_deleteValue } from '$'

const removePrefix = () => {
    const prefix = 'BILICLEANER_'
    const keys = GM_listValues()
    keys.forEach((key) => {
        if (key.startsWith(prefix)) {
            const value = GM_getValue(key)
            const newKey = key.replaceAll(prefix, '')
            GM_setValue(newKey, value)
            GM_deleteValue(key)
        }
    })
}

export const upgrade = () => {
    removePrefix()
}
