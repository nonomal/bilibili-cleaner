import settings from '../settings'

const startTime: number = performance.now()
let last: number = startTime
let curr: number = startTime

/**
 * 计时日志wrapper
 * 输出格式: [bili-cleaner] 0.1 / 500ms | XXXXXXXXXXXXXX
 * 第一个时间为上一条日志到本条日志间隔, 第二个时间为总时长
 * 使用 performance.now() 做精确计时
 *
 * @param loggingFunc console.log等带级别打印日志的函数
 * @param isEnable 是否打印日志
 * @returns 返回wrap后的日志函数
 */
const wrapper = (loggingFunc: (..._args: any[]) => void | undefined, isEnable: boolean) => {
    if (isEnable) {
        return (...innerArgs: any[]) => {
            curr = performance.now()
            loggingFunc(`[bili-cleaner] ${(curr - last).toFixed(0)} / ${curr.toFixed(0)} ms |`, ...innerArgs)
            last = curr
        }
    }
    return (..._args: any) => {}
}

export const log = wrapper(console.log, true)
export const error = wrapper(console.error, true)
export const debugMain = wrapper(console.log, settings.enableDebugMain)
export const debugComponents = wrapper(console.log, settings.enableDebugComponents)
export const debugRules = wrapper(console.log, settings.enableDebugRules)
export const debugVideoFilter = wrapper(console.log, settings.enableDebugVideoFilter)
export const debugCommentFilter = wrapper(console.log, settings.enableDebugCommentFilter)
export const debugDynFilter = wrapper(console.log, settings.enableDebugDynFilter)
