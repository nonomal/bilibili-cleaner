import { item } from '../../../../types/item'

export const homepageBasicItems: item[] = [
    {
        id: 'homepage-hide-banner',
        description: '隐藏 横幅banner',
    },
    {
        id: 'homepage-hide-recommend-swipe',
        description: '隐藏 大图活动轮播',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-subarea',
        description: '隐藏 分区栏',
    },
    {
        id: 'homepage-hide-sticky-header',
        description: '隐藏 滚动页面时 顶部吸附顶栏',
    },
    {
        id: 'homepage-hide-sticky-subarea',
        description: '隐藏 滚动页面时 顶部吸附分区栏',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-adblock-tips',
        description: '隐藏 顶部adblock提示',
        defaultEnable: true,
    },
    {
        id: 'homepage-revert-channel-dynamic-icon',
        description: '恢复 原始动态按钮',
    },
]
