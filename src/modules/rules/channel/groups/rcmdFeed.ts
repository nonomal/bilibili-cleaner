import { Item } from '../../../../types/item'

export const channelRcmdFeedItems: Item[] = [
    {
        id: 'channel-hide-high-energy-topic',
        type: 'checkbox',
        description: '隐藏 前方高能右侧 话题精选',
    },
    {
        id: 'channel-hide-high-energy',
        type: 'checkbox',
        description: '隐藏 前方高能栏目',
    },
    {
        id: 'channel-hide-rank-list',
        type: 'checkbox',
        description: '隐藏 视频栏目右侧 热门列表',
    },
    {
        id: 'channel-hide-ad-banner',
        type: 'checkbox',
        description: '隐藏 广告banner',
        defaultEnable: true,
    },
    {
        id: 'channel-hide-video-info-date',
        type: 'checkbox',
        description: '隐藏 发布时间',
    },
    {
        id: 'channel-hide-danmaku-count',
        type: 'checkbox',
        description: '隐藏 弹幕数',
        defaultEnable: true,
    },
    {
        id: 'channel-hide-bili-watch-later',
        type: 'checkbox',
        description: '隐藏 稍后再看按钮',
    },
    {
        id: 'channel-feed-card-body-grid-gap',
        type: 'checkbox',
        description: '优化 近期投稿栏目 视频行距',
        defaultEnable: true,
    },
    {
        id: 'channel-increase-rcmd-list-font-size',
        type: 'checkbox',
        description: '增大 视频信息字号',
    },
]
