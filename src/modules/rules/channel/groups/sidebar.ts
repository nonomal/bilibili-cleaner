import { Item } from '../../../../types/item'

export const channelSidebarItems: Item[] = [
    {
        id: 'channel-hide-feedback',
        type: 'checkbox',
        description: '隐藏 新版反馈',
        defaultEnable: true,
    },
    {
        id: 'channel-hide-top-btn',
        type: 'checkbox',
        description: '隐藏 回顶部',
    },
]
