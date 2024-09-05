import { Group } from '../../../types/group'
import { spaceBasicItems } from './groups/basic'
import { spaceDynItems } from './groups/dynamic'

export const spaceRules: Group[] = [
    {
        name: '空间页 基本功能',
        items: spaceBasicItems,
    },
    {
        name: '用户动态列表',
        items: spaceDynItems,
    },
]
