import { Item } from '../../../../types/item'

export const searchBasicItems: Item[] = [
    {
        id: 'hide-search-page-search-sticky-header',
        type: 'checkbox',
        description: '顶栏 滚动页面后不再吸附顶部',
    },
    {
        id: 'hide-search-page-ad',
        type: 'checkbox',
        description: '隐藏 搜索结果中的广告',
        defaultEnable: true,
    },
    {
        id: 'hide-search-page-bangumi-pgc-list',
        type: 'checkbox',
        description: '隐藏 搜索结果顶部 版权作品',
    },
    {
        id: 'hide-search-page-activity-game-list',
        type: 'checkbox',
        description: '隐藏 搜索结果顶部 游戏、热搜话题',
    },
    {
        id: 'hide-search-page-danmaku-count',
        type: 'checkbox',
        description: '隐藏 弹幕数量',
        defaultEnable: true,
    },
    {
        id: 'hide-search-page-date',
        type: 'checkbox',
        description: '隐藏 视频日期',
    },
    {
        id: 'hide-search-page-bili-watch-later',
        type: 'checkbox',
        description: '隐藏 稍后再看按钮',
    },
]
