import { Item } from '../../../../types/item'

export const homepageLayoutItems: Item[] = [
    {
        type: 'radio',
        radioName: 'homepage-layout',
        defaultEnableId: 'homepage-layout-default',
        radios: [
            {
                id: 'homepage-layout-default',
                description: '官方默认，自动匹配页面缩放',
            },
            {
                id: 'homepage-layout-4-column',
                description: '使用 4 列布局',
            },
            {
                id: 'homepage-layout-5-column',
                description: '使用 5 列布局',
            },
            {
                id: 'homepage-layout-6-column',
                description: '使用 6 列布局',
            },
        ],
    },
    {
        id: 'homepage-layout-padding',
        type: 'number',
        description: '修改 页面两侧边距 (-1禁用)',
        minValue: -1,
        maxValue: 500,
        defaultValue: -1,
        disableValue: -1,
        addonText: 'px',
        fn: (value: number) => {
            document.documentElement.style.setProperty('--layout-padding', `${value}px`)
        },
    },
]
