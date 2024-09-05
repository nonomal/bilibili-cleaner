import { Item } from '../../../../types/item'

export const liveBelowItems: Item[] = [
    {
        id: 'live-page-flip-view',
        type: 'checkbox',
        description: '隐藏 活动海报',
        defaultEnable: true,
    },
    {
        id: 'live-page-room-info-ctnr',
        type: 'checkbox',
        description: '隐藏 直播间推荐/直播间介绍',
    },
    {
        id: 'live-page-room-feed',
        type: 'checkbox',
        description: '隐藏 主播动态',
    },
    {
        id: 'live-page-announcement-cntr',
        type: 'checkbox',
        description: '隐藏 主播公告',
    },
    {
        id: 'live-page-sections-vm',
        type: 'checkbox',
        description: '隐藏 直播下方全部内容',
    },
]
