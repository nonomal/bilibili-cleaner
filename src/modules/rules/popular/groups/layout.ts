import { Item } from '../../../../types/item'

export const popularLayoutItems: Item[] = [
    {
        type: 'radio',
        radioName: 'popular-layout',
        defaultEnableId: 'popular-layout-default',
        radios: [
            {
                id: 'popular-layout-default',
                description: '官方默认 2 列布局',
            },
            {
                id: 'popular-layout-4-column',
                description: '强制使用 4 列布局',
            },
            {
                id: 'popular-layout-5-column',
                description: '强制使用 5 列布局',
            },
            {
                id: 'popular-layout-6-column',
                description: '强制使用 6 列布局，建议开启 隐藏弹幕数',
            },
        ],
    },
]
