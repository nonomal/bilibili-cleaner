import { Item } from '../../../../types/item'

export const bangumiRightItems: Item[] = [
    {
        id: 'bangumi-page-hide-right-container-section-height',
        type: 'checkbox',
        description: '隐藏 大会员按钮 ★',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-right-container-danmaku',
        type: 'checkbox',
        description: '隐藏 弹幕列表',
        defaultEnable: true,
    },
    {
        id: 'bangumi-page-hide-eplist-badge',
        type: 'checkbox',
        description: '隐藏 视频列表 会员/限免标记 ★',
    },
    {
        id: 'bangumi-page-hide-recommend',
        type: 'checkbox',
        description: '隐藏 相关作品推荐 ★',
    },
]
