import { Item } from '../../../../types/item'

export const popularBasicItems: Item[] = [
    {
        id: 'homepage-hide-banner',
        type: 'checkbox',
        description: '隐藏 横幅banner',
    },
    {
        id: 'homepage-hide-sticky-header',
        type: 'checkbox',
        description: '隐藏 滚动页面时 顶部吸附顶栏',
    },
    {
        id: 'popular-hide-tips',
        type: 'checkbox',
        description: '隐藏 tips',
        defaultEnable: true,
    },
    {
        id: 'popular-hide-watchlater',
        type: 'checkbox',
        description: '隐藏 稍后再看按钮',
    },
    {
        id: 'popular-hide-danmaku-count',
        type: 'checkbox',
        description: '隐藏 弹幕数',
    },
]
