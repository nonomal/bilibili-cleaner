import { Item } from '../../../../types/item'

export const homepageBasicItems: Item[] = [
    {
        id: 'homepage-hide-banner',
        type: 'checkbox',
        description: '隐藏 横幅banner',
    },
    {
        id: 'homepage-hide-recommend-swipe',
        type: 'checkbox',
        description: '隐藏 大图活动轮播',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-subarea',
        type: 'checkbox',
        description: '隐藏 分区栏',
    },
    {
        id: 'homepage-hide-sticky-header',
        type: 'checkbox',
        description: '隐藏 滚动页面时 顶部吸附顶栏',
    },
    {
        id: 'homepage-hide-sticky-subarea',
        type: 'checkbox',
        description: '隐藏 滚动页面时 顶部吸附分区栏',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-adblock-tips',
        type: 'checkbox',
        description: '隐藏 顶部adblock提示',
        defaultEnable: true,
    },
    {
        id: 'homepage-revert-channel-dynamic-icon',
        type: 'checkbox',
        description: '恢复 原始动态按钮',
    },
]
