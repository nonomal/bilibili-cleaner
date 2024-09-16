import { Group } from '../../../types/collection'
import { bangumiBasicItems } from './groups/basic'
import { bangumiDanmakuItems } from './groups/danmaku'
import { bangumiMiniPlayerItems } from './groups/miniPlayer'
import { bangumiPlayerItems } from './groups/player'
import { bangumiPlayerControlItems } from './groups/playerControl'
import { bangumiPlayerLayoutItems } from './groups/playerLayout'
import { bangumiRightItems } from './groups/right'
import { bangumiSidebarItems } from './groups/sidebar'
import { bangumiToolbarItems } from './groups/toolbar'

export const bangumiGroups: Group[] = [
    {
        name: '基本功能',
        items: bangumiBasicItems,
    },
    {
        name: '播放设定',
        items: bangumiPlayerLayoutItems,
    },
    {
        name: '播放器（标★是番剧页独有项）',
        items: bangumiPlayerItems,
    },
    {
        name: '播放控制栏',
        items: bangumiPlayerControlItems,
    },
    {
        name: '弹幕栏',
        items: bangumiDanmakuItems,
    },
    {
        name: '视频下方 工具栏/作品信息',
        items: bangumiToolbarItems,
    },
    {
        name: '右栏 作品选集/其他推荐',
        items: bangumiRightItems,
    },
    {
        name: '小窗播放器',
        items: bangumiMiniPlayerItems,
    },
    {
        name: '页面右下角 小按钮',
        items: bangumiSidebarItems,
    },
]
