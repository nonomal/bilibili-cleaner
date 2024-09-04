import { Item } from '../../../../types/item'

export const homepageAsideItems: Item[] = [
    {
        id: 'homepage-hide-desktop-download-tip',
        type: 'checkbox',
        description: '隐藏 下载桌面端弹窗',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-trial-feed-wrap',
        type: 'checkbox',
        description: '隐藏 下滑浏览推荐提示',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-feed-roll-btn',
        type: 'checkbox',
        description: '隐藏 换一换',
    },
    {
        id: 'homepage-hide-watchlater-pip-button',
        type: 'checkbox',
        description: '隐藏 稍后再看',
    },
    {
        id: 'homepage-hide-flexible-roll-btn',
        type: 'checkbox',
        description: '隐藏 刷新',
    },
    {
        id: 'homepage-hide-feedback',
        type: 'checkbox',
        description: '隐藏 客服和反馈',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-top-btn',
        type: 'checkbox',
        description: '隐藏 回顶部',
    },
]
