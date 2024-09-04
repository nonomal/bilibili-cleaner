import { Item } from '../../../../types/item'

export const bangumiDanmakuItems: Item[] = [
    {
        id: 'video-page-hide-bpx-player-video-info-online',
        type: 'checkbox',
        description: '隐藏 同时在看人数',
    },
    {
        id: 'video-page-hide-bpx-player-video-info-dm',
        type: 'checkbox',
        description: '隐藏 载入弹幕数量',
    },
    {
        id: 'video-page-hide-bpx-player-dm-switch',
        type: 'checkbox',
        description: '隐藏 弹幕启用',
    },
    {
        id: 'video-page-hide-bpx-player-dm-setting',
        type: 'checkbox',
        description: '隐藏 弹幕显示设置',
    },
    {
        id: 'video-page-hide-bpx-player-video-btn-dm',
        type: 'checkbox',
        description: '隐藏 弹幕样式',
    },
    {
        id: 'video-page-hide-bpx-player-dm-input',
        type: 'checkbox',
        description: '隐藏 占位文字',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-bpx-player-dm-hint',
        type: 'checkbox',
        description: '隐藏 弹幕礼仪',
        defaultEnable: true,
    },
    {
        id: 'video-page-hide-bpx-player-dm-btn-send',
        type: 'checkbox',
        description: '隐藏 发送按钮',
    },
    {
        id: 'video-page-hide-bpx-player-sending-area',
        type: 'checkbox',
        description: '非全屏下 关闭弹幕栏',
    },
    {
        id: 'video-page-hide-bpx-player-video-inputbar',
        type: 'checkbox',
        description: '全屏下 关闭弹幕输入框',
    },
]
