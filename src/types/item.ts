// 开关项
export interface ICheckboxItem {
    // id 与 GM key 对应，与样式 HTML attribute 对应
    id: string

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
export interface INumberItem {
    // id 与 GM key 对应，与样式 HTML attribute 对应
    id: string

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
export interface IButtonIten {
    // 功能介绍
    description: string

    // 按钮文字
    buttonText: string

    // 按钮功能函数
    fn: () => Promise<void> | void
}

// 单选组，互斥开关项
type radio = {
    // id 与 GM key 对应，与样式 HTML attribute 对应
    id: string

    // 功能介绍
    description: string

    // 按钮功能函数
    fn?: () => Promise<void> | void
}
export interface IRadioItem {
    // 单选组 radio name
    radioName: string

    // 默认启用的 radio 项 id，id 需在列表内
    defaultEnableId?: string

    // radio 列表
    radios: radio[]
}
