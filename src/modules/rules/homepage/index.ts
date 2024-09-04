import { Group } from '../../../types/group'
import { homepageSidebarItems } from './groups/sidebar'
import { homepageBasicItems } from './groups/basic'
import { homepageLayoutItems } from './groups/layout'
import { homepagePluginItems } from './groups/plugin'
import { homepageRcmdFeedItems } from './groups/rcmdFeed'

export const homepageRules: Group[] = [
    {
        name: '首页 基本功能',
        items: homepageBasicItems,
    },
    {
        name: '页面布局',
        items: homepageLayoutItems,
    },
    {
        name: '视频列表',
        items: homepageRcmdFeedItems,
    },
    {
        name: '页面侧栏 小组件',
        items: homepageSidebarItems,
    },
    {
        name: '适配插件 (bilibili-app-recommend)',
        items: homepagePluginItems,
    },
]
