import { Item } from '../../../../types/item'

export const searchSidebarItems: Item[] = [
    {
        id: 'hide-search-page-customer-service',
        type: 'checkbox',
        description: '隐藏 客服',
        defaultEnable: true,
    },
    {
        id: 'hide-search-page-btn-to-top',
        type: 'checkbox',
        description: '隐藏 回顶部',
    },
]
