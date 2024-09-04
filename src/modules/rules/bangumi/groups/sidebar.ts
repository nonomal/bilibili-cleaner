import { Item } from '../../../../types/item'

export const bangumiSidebarItems: Item[] = [
    {
        id: 'bangumi-page-hide-sidenav-issue',
        type: 'checkbox',
        description: '隐藏 新版反馈 ★',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-sidenav-mini',
        type: 'checkbox',
        description: '隐藏 小窗播放开关',
    },
    {
        id: 'video-page-hide-sidenav-customer-service',
        type: 'checkbox',
        description: '隐藏 客服',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-sidenav-back-to-top',
        type: 'checkbox',
        description: '隐藏 回顶部',
    },
]
