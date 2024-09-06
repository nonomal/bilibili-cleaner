import { Item } from '../../../../types/item'
import { Shadow } from '../../../../utils/shadow'

// shadow DOM 评论区
const shadow = new Shadow([
    'bili-comments-header-renderer', // 评论区header(notice,编辑器)
    'bili-comment-textarea', // 主编辑器、底部编辑器输入框
    'bili-comment-renderer', // 一级评论
    'bili-comment-user-info', // 一级二级评论用户信息
    'bili-rich-text', // 一级二级评论内容
    'bili-avatar', // 头像
    'bili-photoswipe', // 全屏图片查看(笔记图片)
    'bili-user-profile', // 用户卡片
    'bili-comment-user-medal', // 昵称后勋章
    'bili-comment-action-buttons-renderer', // 赞踩回复按钮区域
    'bili-comment-reply-renderer', // 单个二级评论
])

export const commentBasicItems: Item[] = [
    {
        id: 'video-page-hide-reply-notice',
        type: 'checkbox',
        description: '隐藏 活动通知',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-comments-header-renderer',
                'video-page-hide-reply-notice',
                `#notice {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comments-header-renderer', 'video-page-hide-reply-notice')
        },
    },
    {
        id: 'video-page-hide-main-reply-box',
        type: 'checkbox',
        description: '隐藏 评论编辑器',
        enableFn: () => {
            shadow.register(
                'bili-comments-header-renderer',
                'video-page-hide-main-reply-box',
                `#commentbox bili-comment-box {display: none !important;}
                    #navbar {margin-bottom: 0 !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comments-header-renderer', 'video-page-hide-main-reply-box')
        },
    },
    {
        id: 'video-page-hide-reply-box-textarea-placeholder',
        type: 'checkbox',
        description: '隐藏 评论编辑器内占位文字',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-comment-textarea',
                'video-page-hide-reply-box-textarea-placeholder',
                `textarea:not([placeholder^="回复"])::placeholder {color: transparent !important; user-select: none;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-textarea', 'video-page-hide-reply-box-textarea-placeholder')
        },
    },
    {
        id: 'video-page-hide-fixed-reply-box',
        type: 'checkbox',
        description: '隐藏 页面底部 吸附评论框',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-comments-header-renderer',
                'video-page-hide-fixed-reply-box',
                `.bili-comments-bottom-fixed-wrapper {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comments-header-renderer', 'video-page-hide-fixed-reply-box')
        },
    },
    {
        // 测试视频 https://b23.tv/av1805762267
        id: 'video-page-hide-top-vote-card',
        type: 'checkbox',
        description: '隐藏 投票栏 (红方/蓝方)',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-comments-header-renderer',
                'video-page-hide-top-vote-card',
                `#vote {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comments-header-renderer', 'video-page-hide-top-vote-card')
        },
    },
    {
        id: 'video-page-hide-comment-user-card',
        type: 'checkbox',
        description: '隐藏 用户卡片\n鼠标放在用户名上时不显示卡片',
        enableFn: () => {
            shadow.register(
                'bili-user-profile',
                'video-page-hide-comment-user-card',
                `#wrap {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-user-profile', 'video-page-hide-comment-user-card')
        },
    },
    {
        id: 'video-page-hide-reply-decorate',
        type: 'checkbox',
        description: '隐藏 评论右侧装饰',
        enableFn: () => {
            shadow.register(
                'bili-comment-renderer',
                'video-page-hide-reply-decorate',
                `#ornament {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-renderer', 'video-page-hide-reply-decorate')
        },
    },
    {
        id: 'video-page-hide-fan-badge',
        type: 'checkbox',
        description: '隐藏 粉丝牌',
        enableFn: () => {
            shadow.register('bili-comment-user-medal', 'video-page-hide-fan-badge', `#fans {display: none !important;}`)
        },
        disableFn: () => {
            shadow.unregister('bili-comment-user-medal', 'video-page-hide-fan-badge')
        },
    },
    {
        // 测试视频 https://b23.tv/av479061422
        id: 'video-page-hide-contractor-box',
        type: 'checkbox',
        description: '隐藏 老粉、原始粉丝Tag',
        enableFn: () => {
            shadow.register(
                'bili-comment-user-medal',
                'video-page-hide-contractor-box',
                `#contractor {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-user-medal', 'video-page-hide-contractor-box')
        },
    },
    {
        id: 'video-page-hide-user-level',
        type: 'checkbox',
        description: '隐藏 用户等级',
        enableFn: () => {
            shadow.register(
                'bili-comment-user-info',
                'video-page-hide-user-level',
                `#user-level {display: none !important;}
                #user-name {margin-right: 5px;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-user-info', 'video-page-hide-user-level')
        },
    },
    {
        id: 'video-page-hide-bili-avatar-pendent-dom',
        type: 'checkbox',
        description: '隐藏 用户头像饰品',
        enableFn: () => {
            shadow.register(
                'bili-avatar',
                'video-page-hide-bili-avatar-pendent-dom',
                `picture:has(img[src*="/bfs/garb/"]) {display: none !important;}
                .layer-res[style*="bfs/garb/"] {display: none !important;}
                .layer.center[style^="width: 66px"] {display: none !important;}
                /* 统一头像大小 */
                .layer.center {width: 48px !important; height: 48px !important;}
                `,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-avatar', 'video-page-hide-bili-avatar-pendent-dom')
        },
    },
    {
        id: 'video-page-hide-bili-avatar-nft-icon',
        type: 'checkbox',
        description: '隐藏 用户头像徽章',
        enableFn: () => {
            shadow.register(
                'bili-avatar',
                'video-page-hide-bili-avatar-nft-icon',
                `.layer:not(.center) {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-avatar', 'video-page-hide-bili-avatar-nft-icon')
        },
    },
    {
        // 测试视频 https://b23.tv/av1805762267
        id: 'video-page-hide-vote-info',
        type: 'checkbox',
        description: '隐藏 用户投票 (红方/蓝方)',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-comment-renderer',
                'video-page-hide-vote-info',
                `bili-comment-vote-option {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-renderer', 'video-page-hide-vote-info')
        },
    },
    {
        id: 'video-page-hide-reply-tag-list',
        type: 'checkbox',
        description: '隐藏 评论内容下Tag (UP觉得很赞)',
        enableFn: () => {
            shadow.register(
                'bili-comment-renderer',
                'video-page-hide-reply-tag-list',
                `#tags {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-renderer', 'video-page-hide-reply-tag-list')
        },
    },
    {
        id: 'video-page-hide-note-prefix',
        type: 'checkbox',
        description: '隐藏 笔记评论前的小Logo',
        defaultEnable: true,
        enableFn: () => {
            shadow.register('bili-comment-renderer', 'video-page-hide-note-prefix', `#note {display: none !important;}`)
        },
        disableFn: () => {
            shadow.unregister('bili-comment-renderer', 'video-page-hide-note-prefix')
        },
    },
    {
        // 测试视频 https://b23.tv/av1406084552
        id: 'video-page-hide-jump-link-search-word',
        type: 'checkbox',
        description: '禁用 评论内容搜索关键词高亮',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-rich-text',
                'video-page-hide-jump-link-search-word',
                `#contents a[href*="search.bilibili.com"] {color: inherit !important;}
                #contents a[href*="search.bilibili.com"]:hover {color: #008AC5 !important;}
                #contents a[href*="search.bilibili.com"] img {display: none !important;}
                `,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-rich-text', 'video-page-hide-jump-link-search-word')
        },
    },
    {
        id: 'video-page-hide-reply-content-user-highlight',
        type: 'checkbox',
        description: '禁用 评论中的@高亮',
        enableFn: () => {
            shadow.register(
                'bili-rich-text',
                'video-page-hide-reply-content-user-highlight',
                `#contents a[href*="space.bilibili.com"] {color: inherit !important;}
                #contents a[href*="space.bilibili.com"]:hover {color: #008AC5 !important;}
                `,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-rich-text', 'video-page-hide-reply-content-user-highlight')
        },
    },
    {
        id: 'video-page-hide-reply-dislike-reply-btn',
        type: 'checkbox',
        description: '隐藏 踩/回复 只在hover时显示',
        defaultEnable: true,
        enableFn: () => {
            /* 借用more button的display样式，改为传透明度值 */
            shadow.register(
                'bili-comment-renderer', // 一级评论
                'video-page-hide-root-reply-dislike-reply-btn',
                `#body {
                    --bili-comment-hover-more-display: 0 !important;
                }
                #body:hover {
                    --bili-comment-hover-more-display: 1 !important;
                }`,
            )
            shadow.register(
                'bili-comment-reply-renderer', // 二级评论
                'video-page-hide-sub-reply-dislike-reply-btn',
                `
                #body {
                    --bili-comment-hover-more-display: 0 !important;
                }
                #body:hover {
                    --bili-comment-hover-more-display: 1 !important;
                }`,
            )
            shadow.register(
                'bili-comment-action-buttons-renderer',
                'video-page-hide-root-reply-dislike-reply-btn',
                `#dislike button, #reply button, #more button {
                    display: block !important;
                    opacity: var(--bili-comment-action-buttons-more-display);
                    transition: opacity 0.2s 0.3s;
                }`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-renderer', 'video-page-hide-root-reply-dislike-reply-btn')
            shadow.unregister('bili-comment-action-buttons-renderer', 'video-page-hide-root-reply-dislike-reply-btn')
        },
    },
    {
        // 测试视频 https://b23.tv/av1406211916
        id: 'video-page-hide-emoji-large',
        type: 'checkbox',
        description: '隐藏 大表情',
        enableFn: () => {
            shadow.register(
                'bili-rich-text',
                'video-page-hide-emoji-large',
                `#contents img:is(.emoji-large, [style^="width:50px"]) {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-rich-text', 'video-page-hide-emoji-large')
        },
    },
    {
        // 测试视频 https://b23.tv/av1406211916
        id: 'video-page-hide-emoji-large-zoom',
        type: 'checkbox',
        description: '大表情变成小表情',
        enableFn: () => {
            shadow.register(
                'bili-rich-text',
                'video-page-hide-emoji-large-zoom',
                `#contents img:is(.emoji-large, [style^="width:50px"]) {zoom: 0.5 !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-rich-text', 'video-page-hide-emoji-large-zoom')
        },
    },
    {
        id: 'video-page-reply-user-name-color-pink',
        type: 'checkbox',
        description: '用户名 全部大会员色',
        enableFn: () => {
            shadow.register(
                'bili-comment-user-info',
                'video-page-reply-user-name-color-pink',
                `#user-name {color: #FB7299 !important;}
                #user-name a {color: #FB7299 !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-user-info', 'video-page-reply-user-name-color-pink')
        },
    },
    {
        id: 'video-page-reply-user-name-color-default',
        type: 'checkbox',
        description: '用户名 全部恢复默认色',
        enableFn: () => {
            shadow.register(
                'bili-comment-user-info',
                'video-page-reply-user-name-color-default',
                `#user-name {color: #61666d !important;}
                #user-name a {color: #61666d !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-comment-user-info', 'video-page-reply-user-name-color-default')
        },
    },
    {
        // 测试视频 https://b23.tv/av34205337
        id: 'video-page-reply-view-image-optimize',
        type: 'checkbox',
        description: '笔记图片 查看大图优化',
        defaultEnable: true,
        enableFn: () => {
            shadow.register(
                'bili-photoswipe',
                'video-page-reply-view-image-optimize',
                `#wrap:has(#thumb:empty) :is(#prev, #next) {display: none !important;}
                #prev, #next {zoom: 1.3;}
                #thumb {display: none !important;}`,
            )
        },
        disableFn: () => {
            shadow.unregister('bili-photoswipe', 'video-page-reply-view-image-optimize')
        },
    },
    {
        id: 'video-page-hide-comment',
        type: 'checkbox',
        description: '隐藏 视频评论区 (播放页/番剧页)',
    },
    {
        id: 'dynamic-page-hide-all-comment',
        type: 'checkbox',
        description: '隐藏 动态评论区 (动态页/空间页)',
    },
]
