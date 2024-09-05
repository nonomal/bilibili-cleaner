import { Item } from '../../../../types/item'

export const dynamicRightItems: Item[] = [
    {
        id: 'hide-dynamic-page-bili-dyn-banner',
        type: 'checkbox',
        description: '隐藏 社区中心',
        defaultEnable: true,
    },
    {
        id: 'hide-dynamic-page-bili-dyn-ads',
        type: 'checkbox',
        description: '隐藏 广告',
        defaultEnable: true,
    },
    {
        id: 'hide-dynamic-page-bili-dyn-topic-box',
        type: 'checkbox',
        description: '隐藏 话题列表',
    },
    {
        id: 'hide-dynamic-page-aside-right',
        type: 'checkbox',
        description: '隐藏 整个右栏',
    },
]
