import { Item } from '../../../../types/item'

export const channelBasicItems: Item[] = [
    {
        id: 'homepage-hide-banner',
        type: 'checkbox',
        description: '隐藏 横幅banner',
    },
    {
        id: 'channel-hide-subarea',
        type: 'checkbox',
        description: '隐藏 全站分区栏',
    },
    {
        id: 'channel-hide-carousel',
        type: 'checkbox',
        description: '隐藏 大图轮播',
    },
    {
        id: 'channel-hide-sticky-subchannel',
        type: 'checkbox',
        description: '隐藏 滚动页面时 顶部吸附分区栏',
    },
    {
        id: 'channel-hide-sticky-header',
        type: 'checkbox',
        description: '隐藏 滚动页面时 顶部吸附顶栏',
    },
    {
        id: 'channel-layout-padding',
        type: 'number',
        description: '修改 页面两侧边距 (-1禁用)',
        minValue: -1,
        maxValue: 500,
        defaultValue: -1,
        disableValue: -1,
        addonText: 'px',
        fn: (value: number) => {
            document.documentElement.style.setProperty('--layout-padding', `${value}px`)
        },
    },
]
