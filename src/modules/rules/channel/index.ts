import { Group } from '../../../types/group'
import { channelBasicItems } from './groups/basic'
import { channelRcmdFeedItems } from './groups/rcmdFeed'
import { channelSidebarItems } from './groups/sidebar'

export const channelRules: Group[] = [
    {
        name: '分区页 基础功能',
        items: channelBasicItems,
    },
    {
        name: '视频列表',
        items: channelRcmdFeedItems,
    },
    {
        name: '页面右下角 小按钮',
        items: channelSidebarItems,
    },
]
