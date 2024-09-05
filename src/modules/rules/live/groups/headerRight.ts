import { Item } from '../../../../types/item'

export const liveHeaderRightItems: Item[] = [
    {
        id: 'live-page-header-avatar',
        type: 'checkbox',
        description: '隐藏 头像',
    },
    {
        id: 'live-page-header-follow-panel',
        type: 'checkbox',
        description: '隐藏 关注',
    },
    {
        id: 'live-page-header-recharge',
        type: 'checkbox',
        description: '隐藏 购买电池',
    },
    {
        id: 'live-page-header-bili-download-panel',
        type: 'checkbox',
        description: '隐藏 下载客户端',
    },
    {
        id: 'live-page-header-go-live',
        type: 'checkbox',
        description: '隐藏 我要开播',
        defaultEnable: true,
    },
]
