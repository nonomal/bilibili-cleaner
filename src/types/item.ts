/**
 * item 是一个独立功能，也是 vue 组件的 props
 */
export type Item = ICheckboxItem | INumberItem | IButtonItem | IRadioItem

interface IBaseItem {
    // item类型
    type: 'checkbox' | 'number' | 'radio' | 'button'
}

// 开关项
export interface ICheckboxItem extends IBaseItem {
    // id 与 GM key 对应，与样式 HTML attribute 对应
    id: string

    // item类型
    type: 'checkbox'

    // 功能介绍
    description: string

    // 是否无样式
    noStyle?: boolean

    // 默认启用
    defaultEnable?: boolean

    // 启用函数
    enableFn?: () => Promise<void> | void

    // 禁用函数
    disableFn?: () => Promise<void> | void

    /**
     * 启用函数运行时机
     * document-start 立即运行
     * document-end 由 DOMContentLoaded 触发
     */
    enableFnRunAt?: 'document-start' | 'document-end'
}

// 数值设定项
export interface INumberItem extends IBaseItem {
    // id 与 GM key 对应，与样式 HTML attribute 对应
    id: string

    // item类型
    type: 'number'

    // 功能介绍
    description: string

    // 最小值
    minValue: number

    // 最大值
    maxValue: number

    // 默认值
    defaultValue: number

    // 禁用值
    disableValue: number

    /**
     * 回调，值初始化或变化时执行，可用于修改样式 var() 变量值
     * @param value 变化值
     */
    fn: (value: number) => Promise<void> | void
}

// 普通按钮项
export interface IButtonItem extends IBaseItem {
    // 功能介绍
    description: string

    // item类型
    type: 'button'

    // 按钮文字
    buttonText: string

    // 按钮功能函数
    fn: () => Promise<void> | void
}

// 互斥项 (单选组)
export interface IRadioItem extends IBaseItem {
    // 单选组 radio name
    radioName: string

    // item类型
    type: 'radio'

    // 默认启用的 radio 项 id，id 需在列表内
    defaultEnableId?: string

    // radio项列表
    radios: {
        // id 与 GM key 对应，与样式 HTML attribute 对应
        id: string

        // 功能介绍
        description: string
    }[]
}
