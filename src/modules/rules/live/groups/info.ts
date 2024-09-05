import { Item } from '../../../../types/item'

export const liveInfoItems: Item[] = [
    {
        id: 'live-page-head-info-avatar-pendant',
        type: 'checkbox',
        description: '隐藏 头像饰品',
    },
    {
        id: 'live-page-head-info-vm-upper-row-follow-ctnr',
        type: 'checkbox',
        description: '隐藏 粉丝团',
    },
    {
        id: 'live-page-head-info-vm-upper-row-visited',
        type: 'checkbox',
        description: '隐藏 xx人看过',
    },
    {
        id: 'live-page-head-info-vm-upper-row-popular',
        type: 'checkbox',
        description: '隐藏 人气',
    },
    {
        id: 'live-page-head-info-vm-upper-row-like',
        type: 'checkbox',
        description: '隐藏 点赞',
    },
    {
        id: 'live-page-head-info-vm-upper-row-report',
        type: 'checkbox',
        description: '隐藏 举报',
        defaultEnable: true,
    },
    {
        id: 'live-page-head-info-vm-upper-row-share',
        type: 'checkbox',
        description: '隐藏 分享',
        defaultEnable: true,
    },
    {
        id: 'live-page-head-info-vm-lower-row-hot-rank',
        type: 'checkbox',
        description: '隐藏 人气榜',
        defaultEnable: true,
    },
    {
        id: 'live-page-head-info-vm-lower-row-gift-planet-entry',
        type: 'checkbox',
        description: '隐藏 礼物',
    },
    {
        id: 'live-page-head-info-vm-lower-row-activity-gather-entry',
        type: 'checkbox',
        description: '隐藏 活动',
        defaultEnable: true,
    },
    {
        id: 'live-page-head-info-vm',
        type: 'checkbox',
        description: '隐藏 整个信息栏',
    },
]
