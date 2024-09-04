/**
 * 等待<html>出现+渲染, 用于插入节点
 * head节点出现标志html已渲染完成
 * pnpm run dev调试时，可能出现由于vite-plugin-monkey抢先监听document
 * 导致脚本载入失败或载入缓慢的情况, 若刷新无效可先build再调试
 */
export const waitForHead = () => {
    return new Promise<void>((resolve) => {
        if (document.head) {
            resolve()
            return
        }
        const observer = new MutationObserver(() => {
            if (document.head) {
                observer.disconnect()
                resolve()
            }
        })
        observer.observe(document, { childList: true, subtree: true })
    })
}

/** 等body出现 */
export const waitForBody = () => {
    return new Promise<void>((resolve) => {
        if (document.body) {
            resolve()
            return
        }
        const observer = new MutationObserver(() => {
            if (document.body) {
                observer.disconnect()
                resolve()
            }
        })
        observer.observe(document, { childList: true, subtree: true })
    })
}
