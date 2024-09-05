import { Item } from '../../../../types/item'

export const dynamicCenterDynItems: Item[] = [
    {
        id: 'hide-dynamic-page-bili-dyn-avatar-pendent',
        type: 'checkbox',
        description: '隐藏 头像框',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-avatar-icon',
        type: 'checkbox',
        description: '隐藏 头像徽章',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-ornament',
        type: 'checkbox',
        description: '隐藏 动态右侧饰品',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-dispute',
        type: 'checkbox',
        description: '隐藏 警告notice',
        defaultEnable: true,
    },
    {
        id: 'hide-dynamic-page-bili-dyn-watchlater',
        type: 'checkbox',
        description: '隐藏 稍后再看按钮',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-official-topic',
        type: 'checkbox',
        description: '隐藏 官方话题Tag',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-text-topic',
        type: 'checkbox',
        description: '禁用 普通话题#Tag#高亮',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-item-interaction',
        type: 'checkbox',
        description: '隐藏 动态精选互动 XXX赞了/XXX回复',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-card-reserve',
        type: 'checkbox',
        description: '隐藏 视频预约/直播预约动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-card-goods',
        type: 'checkbox',
        description: '隐藏 带货动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-lottery',
        type: 'checkbox',
        description: '隐藏 抽奖动态(含转发)',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-forward',
        type: 'checkbox',
        description: '隐藏 转发的动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-vote',
        type: 'checkbox',
        description: '隐藏 投票动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-live',
        type: 'checkbox',
        description: '隐藏 直播通知动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-blocked',
        type: 'checkbox',
        description: '隐藏 被block的充电动态',
    },
    {
        id: 'hide-dynamic-page-bili-dyn-charge-video',
        type: 'checkbox',
        description: '隐藏 全部充电视频(含已充电)',
    },
    {
        id: 'dynamic-page-unfold-dynamic',
        type: 'checkbox',
        description: '自动展开 相同UP主被折叠的动态',
        noStyle: true,
        enableFn: async () => {
            // 大量动态下，单次耗时10ms内
            const unfold = () => {
                const dynFoldNodes = document.querySelectorAll<HTMLElement>(
                    'main .bili-dyn-list__item .bili-dyn-item-fold',
                )
                dynFoldNodes.forEach((e) => {
                    e.click()
                })
            }
            setInterval(unfold, 500)
        },
    },
    {
        id: '',
        type: 'checkbox',
        description: '',
    },
    {
        id: '',
        type: 'checkbox',
        description: '',
    },
    {
        id: '',
        type: 'checkbox',
        description: '',
    },
    {
        id: '',
        type: 'checkbox',
        description: '',
    },
]
