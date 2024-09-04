import { Item } from '../../../../types/item'

export const bangumiPlayerItems: Item[] = [
    {
        id: 'video-page-hide-bpx-player-top-left-title',
        type: 'checkbox',
        description: '隐藏 播放器内标题',
    },
    {
        id: 'bangumi-page-hide-bpx-player-top-follow',
        type: 'checkbox',
        description: '隐藏 追番/追剧按钮 ★',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-bpx-player-top-issue',
        type: 'checkbox',
        description: '隐藏 反馈按钮',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-bpx-player-state-wrap',
        type: 'checkbox',
        description: '隐藏 视频暂停时大Logo',
    },
    {
        id: 'bangumi-page-hide-bpx-player-record-item-wrap',
        type: 'checkbox',
        description: '隐藏 视频内封审核号(非内嵌) ★',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-bpx-player-dialog-wrap',
        type: 'checkbox',
        description: '隐藏 弹幕悬停 点赞/复制/举报',
    },
    {
        id: 'video-page-bpx-player-bili-high-icon',
        type: 'checkbox',
        description: '隐藏 高赞弹幕前点赞按钮',
    },
    {
        id: 'video-page-bpx-player-bili-dm-vip-white',
        type: 'checkbox',
        description: '彩色渐变弹幕 变成白色',
    },
]
