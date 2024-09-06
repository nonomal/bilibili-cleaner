import { Group } from '../../../types/group'
import { popularBasicItems } from './groups/basic'
import { popularLayoutItems } from './groups/layout'
import { popularMiscItems } from './groups/misc'

export const popularRules: Group[] = [
    {
        name: '热门页/排行榜页 基本功能',
        items: popularBasicItems,
    },
    {
        name: '页面强制布局',
        items: popularLayoutItems,
    },
    {
        name: '其他',
        items: popularMiscItems,
    },
]
