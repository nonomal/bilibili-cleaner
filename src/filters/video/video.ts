import { GM_getValue, GM_setValue, unsafeWindow } from '$'
import { ContextMenu } from '../../components/contextmenu'
import { Group } from '../../components/group'
import { CheckboxItem, NumberItem, ButtonItem } from '../../components/item'
import { WordList } from '../../components/wordlist'
import { debugVideoFilter as debug, error } from '../../utils/logger'
import { isPageVideo, isPageBangumi, isPagePlaylist } from '../../utils/pageType'
import { convertTimeToSec, isEleHide, matchBvid, waitForEle } from '../../utils/tool'
import { SelectorResult, SubFilterPair, coreCheck } from '../core/core'
import {
    VideoBvidFilter,
    VideoDurationFilter,
    VideoTitleFilter,
    VideoUploaderFilter,
    VideoUploaderKeywordFilter,
} from './subFilters/black'
import { VideoUploaderWhiteFilter, VideoTitleWhiteFilter } from './subFilters/white'

const videoPageVideoFilterGroupList: Group[] = []

const GM_KEYS = {
    black: {
        duration: {
            statusKey: 'video-duration-filter-status',
            valueKey: 'global-duration-filter-value',
        },
        uploader: {
            statusKey: 'video-uploader-filter-status',
            valueKey: 'global-uploader-filter-value',
        },
        uploaderKeyword: {
            statusKey: 'video-uploader-keyword-filter-status',
            valueKey: 'global-uploader-keyword-filter-value',
        },
        bvid: {
            statusKey: 'video-bvid-filter-status',
            valueKey: 'global-bvid-filter-value',
        },
        title: {
            statusKey: 'video-title-keyword-filter-status',
            valueKey: 'global-title-keyword-filter-value',
        },
        related: {
            statusKey: 'video-related-filter-status',
        },
    },
    white: {
        uploader: {
            statusKey: 'video-uploader-whitelist-filter-status',
            valueKey: 'global-uploader-whitelist-filter-value',
        },
        title: {
            statusKey: 'video-title-keyword-whitelist-filter-status',
            valueKey: 'global-title-keyword-whitelist-filter-value',
        },
    },
}

if (isPageVideo() || isPageBangumi() || isPagePlaylist()) {
    // 初始化黑名单
    const videoBvidFilter = new VideoBvidFilter()
    videoBvidFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.bvid.valueKey}`, []))

    const videoDurationFilter = new VideoDurationFilter()
    videoDurationFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.duration.valueKey}`, 0))

    const videoTitleFilter = new VideoTitleFilter()
    videoTitleFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.title.valueKey}`, []))

    const videoUploaderFilter = new VideoUploaderFilter()
    videoUploaderFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.uploader.valueKey}`, []))

    const videoUploaderKeywordFilter = new VideoUploaderKeywordFilter()
    videoUploaderKeywordFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.uploaderKeyword.valueKey}`, []))

    // 初始化白名单
    const videoUploaderWhiteFilter = new VideoUploaderWhiteFilter()
    videoUploaderWhiteFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.white.uploader.valueKey}`, []))

    const videoTitleWhiteFilter = new VideoTitleWhiteFilter()
    videoTitleWhiteFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.white.title.valueKey}`, []))

    // 视频列表信息提取
    const selectorFns = {
        duration: (video: HTMLElement): SelectorResult => {
            const duration = video.querySelector('.pic-box span.duration')?.textContent
            return duration ? convertTimeToSec(duration) : undefined
        },
        title: (video: HTMLElement): SelectorResult => {
            return video.querySelector('.info > a p')?.textContent?.trim()
        },
        bvid: (video: HTMLElement): SelectorResult => {
            const href =
                video.querySelector('.info > a')?.getAttribute('href') ||
                video.querySelector('.pic-box .framepreview-box > a')?.getAttribute('href')
            return (href && matchBvid(href)) ?? undefined
        },
        uploader: (video: HTMLElement): SelectorResult => {
            return video.querySelector('.info > .upname .name')?.textContent?.trim()
        },
    }

    let videoListContainer: HTMLElement

    // 检测视频列表
    const checkVideoList = async (_fullSite: boolean) => {
        if (!videoListContainer) {
            return
        }
        try {
            // 提取元素
            const videos = Array.from(
                videoListContainer.querySelectorAll<HTMLElement>(
                    `.next-play :is(.video-page-card-small, .video-page-operator-card-small),
                    .rec-list :is(.video-page-card-small, .video-page-operator-card-small), .recommend-video-card`,
                ),
            )

            // videos.forEach((v) => {
            //     debug(
            //         [
            //             `videos`,
            //             `bvid: ${selectorFns.bvid(v)}`,
            //             `duration: ${selectorFns.duration(v)}`,
            //             `title: ${selectorFns.title(v)}`,
            //             `uploader: ${selectorFns.uploader(v)}`,
            //         ].join('\n'),
            //     )
            // })

            // 构建黑白检测任务
            const blackPairs: SubFilterPair[] = []
            videoBvidFilter.isEnable && blackPairs.push([videoBvidFilter, selectorFns.bvid])
            videoDurationFilter.isEnable && blackPairs.push([videoDurationFilter, selectorFns.duration])
            videoTitleFilter.isEnable && blackPairs.push([videoTitleFilter, selectorFns.title])
            videoUploaderFilter.isEnable && blackPairs.push([videoUploaderFilter, selectorFns.uploader])
            videoUploaderKeywordFilter.isEnable && blackPairs.push([videoUploaderKeywordFilter, selectorFns.uploader])

            const whitePairs: SubFilterPair[] = []
            videoUploaderWhiteFilter.isEnable && whitePairs.push([videoUploaderWhiteFilter, selectorFns.uploader])
            videoTitleWhiteFilter.isEnable && whitePairs.push([videoTitleWhiteFilter, selectorFns.title])

            // 检测
            videos.length && (await coreCheck(videos, false, blackPairs, whitePairs))
            debug(`check ${videos.length} videos`)
        } catch (err) {
            error('checkVideoList error', err)
        }
    }

    // 检测相关视频数据 __INITIAL_STATE__.related, 右侧视频列表检测完成后触发
    let isRelatedFilterEnable = false
    const checkRelated = async () => {
        if (!isRelatedFilterEnable) {
            return
        }
        const video = document.querySelector('video')
        if (!video) {
            return
        }
        const rightList = document.querySelectorAll<HTMLElement>(`
                .recommend-video-card,
                :is(.next-play, .rec-list) :is(.video-page-card-small, .video-page-operator-card-small)
            `)
        const blackBvids = new Set<string>()
        rightList.forEach((video: HTMLElement) => {
            if (isEleHide(video)) {
                const url = video.querySelector('.info > a')?.getAttribute('href')
                if (url) {
                    const bvid = matchBvid(url)
                    bvid && blackBvids.add(bvid)
                }
            }
        })

        const rel = unsafeWindow.__INITIAL_STATE__?.related
        if (rel?.length && blackBvids.size) {
            unsafeWindow.__INITIAL_STATE__!.related = rel.filter((v) => !(v.bvid && blackBvids.has(v.bvid)))
        }
    }

    const check = (fullSite: boolean) => {
        if (
            videoBvidFilter.isEnable ||
            videoDurationFilter.isEnable ||
            videoTitleFilter.isEnable ||
            videoUploaderFilter.isEnable ||
            videoUploaderKeywordFilter.isEnable
        ) {
            checkVideoList(fullSite)
                .then(() => {
                    isRelatedFilterEnable && checkRelated().then().catch()
                })
                .catch()
        }
    }

    // 右键监听, 屏蔽UP主
    let isContextMenuFuncRunning = false
    let isContextMenuUploaderEnable = false
    let isContextMenuBvidEnable = false
    const contextMenuFunc = () => {
        if (isContextMenuFuncRunning) {
            return
        }
        isContextMenuFuncRunning = true
        const menu = new ContextMenu()
        document.addEventListener('contextmenu', (e) => {
            menu.hide()
            if (e.target instanceof HTMLElement) {
                const target = e.target
                if (
                    isContextMenuUploaderEnable &&
                    (target.classList.contains('name') ||
                        target.classList.contains('up-name') ||
                        target.parentElement?.classList.contains('up-name') ||
                        target.closest('.staff-info'))
                ) {
                    // 命中UP主
                    const uploader =
                        target.closest('.staff-info')?.querySelector('.staff-name')?.textContent?.trim() ||
                        target.textContent?.trim() ||
                        target.parentElement?.textContent?.trim()
                    if (uploader) {
                        e.preventDefault()
                        menu.registerMenu(`◎ 屏蔽UP主：${uploader}`, () => {
                            videoUploaderFilter.addParam(uploader)
                            check(true)
                            try {
                                const arr: string[] = GM_getValue(`BILICLEANER_${GM_KEYS.black.uploader.valueKey}`, [])
                                if (!arr.includes(uploader)) {
                                    arr.unshift(uploader)
                                    GM_setValue(`BILICLEANER_${GM_KEYS.black.uploader.valueKey}`, arr)
                                }
                            } catch (err) {
                                error('contextMenuFunc addParam error', err)
                            }
                        })
                        menu.registerMenu(`◎ 将UP主加入白名单`, () => {
                            videoUploaderWhiteFilter.addParam(uploader)
                            check(true)
                            try {
                                const arr: string[] = GM_getValue(`BILICLEANER_${GM_KEYS.white.uploader.valueKey}`, [])
                                if (!arr.includes(uploader)) {
                                    arr.unshift(uploader)
                                    GM_setValue(`BILICLEANER_${GM_KEYS.white.uploader.valueKey}`, arr)
                                }
                            } catch (err) {
                                error('contextMenuFunc addParam error', err)
                            }
                        })
                        const url = target.closest('.upname')?.querySelector(':scope a')?.getAttribute('href')
                        if (url) {
                            const matches = url.match(/space\.bilibili\.com\/\d+/g)
                            matches &&
                                menu.registerMenu(`◎ 复制主页链接`, () => {
                                    navigator.clipboard.writeText(`https://${matches[0]}`).then().catch()
                                })
                        }
                        menu.show(e.clientX, e.clientY)
                    }
                } else if (isContextMenuBvidEnable && target.classList.contains('title')) {
                    // 命中视频标题, 提取bvid
                    const href = target.parentElement?.getAttribute('href')
                    if (href) {
                        const bvid = matchBvid(href)
                        if (bvid) {
                            e.preventDefault()
                            menu.registerMenu(`◎ 屏蔽视频 ${bvid}`, () => {
                                videoBvidFilter.addParam(bvid)
                                check(true)
                                try {
                                    const arr: string[] = GM_getValue(`BILICLEANER_${GM_KEYS.black.bvid.valueKey}`, [])
                                    if (!arr.includes(bvid)) {
                                        arr.unshift(bvid)
                                        GM_setValue(`BILICLEANER_${GM_KEYS.black.bvid.valueKey}`, arr)
                                    }
                                } catch (err) {
                                    error('contextMenuFunc addParam error', err)
                                }
                            })
                            menu.registerMenu(`◎ 复制视频链接`, () => {
                                navigator.clipboard.writeText(`https://www.bilibili.com/video/${bvid}`).then().catch()
                            })
                            menu.show(e.clientX, e.clientY)
                        }
                    }
                } else {
                    menu.hide()
                }
            }
        })
    }

    try {
        waitForEle(document, '#reco_list, .recommend-list-container', (node: HTMLElement): boolean => {
            return node.id === 'reco_list' || node.className === 'recommend-list-container'
        }).then((ele) => {
            if (ele) {
                videoListContainer = ele
                check(true)
                // 监听视频列表变化
                new MutationObserver(() => {
                    check(true)
                }).observe(videoListContainer, { childList: true, subtree: true })
            }
        })
    } catch (err) {
        error(`watch video list error`, err)
    }

    // UI组件, 时长过滤
    const durationItems = [
        // 启用 播放页时长过滤
        new CheckboxItem({
            itemID: GM_KEYS.black.duration.statusKey,
            description: '启用 时长过滤',
            enableFunc: () => {
                videoDurationFilter.enable()
                check(true)
            },
            disableFunc: () => {
                videoDurationFilter.disable()
                check(true)
            },
        }),
        // 设定最低时长
        new NumberItem({
            itemID: GM_KEYS.black.duration.valueKey,
            description: '设定最低时长 (0~300s)',
            defaultValue: 60,
            minValue: 0,
            maxValue: 300,
            disableValue: 0,
            unit: '秒',
            callback: async (value: number) => {
                videoDurationFilter.setParam(value)
                check(true)
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(new Group('video-duration-filter-group', '播放页 时长过滤', durationItems))

    // UI组件, UP主过滤
    const uploaderItems = [
        // 启用 播放页UP主过滤, 默认开启
        new CheckboxItem({
            itemID: GM_KEYS.black.uploader.statusKey,
            description: '启用 UP主过滤 (右键单击UP主)',
            defaultStatus: true,
            enableFunc: () => {
                // 启用右键菜单功能
                isContextMenuUploaderEnable = true
                contextMenuFunc()
                videoUploaderFilter.enable()
                check(true)
            },
            disableFunc: () => {
                // 禁用右键菜单功能
                isContextMenuUploaderEnable = false
                videoUploaderFilter.disable()
                check(true)
            },
        }),
        // 编辑 UP主黑名单
        new ButtonItem({
            itemID: 'video-uploader-edit-button',
            description: '编辑 UP主黑名单',
            name: '编辑',
            itemFunc: () => {
                new WordList(
                    GM_KEYS.black.uploader.valueKey,
                    'UP主 黑名单',
                    `每行一个UP主昵称，保存时自动去重`,
                    (values: string[]) => {
                        videoUploaderFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
        // 启用 UP主昵称关键词过滤
        new CheckboxItem({
            itemID: GM_KEYS.black.uploaderKeyword.statusKey,
            description: '启用 UP主昵称关键词过滤',
            enableFunc: () => {
                videoUploaderKeywordFilter.enable()
                check(true)
            },
            disableFunc: () => {
                videoUploaderKeywordFilter.disable()
                check(true)
            },
        }),
        // 编辑 UP主昵称关键词黑名单
        new ButtonItem({
            itemID: 'video-uploader-keyword-edit-button',
            description: '编辑 UP主昵称关键词黑名单',
            name: '编辑',
            itemFunc: () => {
                new WordList(
                    GM_KEYS.black.uploaderKeyword.valueKey,
                    'UP主昵称关键词 黑名单',
                    `每行一个关键词或正则，不区分大小写\n正则默认iu模式，无需flag，语法：/abc|\\d+/`,
                    (values: string[]) => {
                        videoUploaderKeywordFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(new Group('video-uploader-filter-group', '播放页 UP主过滤', uploaderItems))

    // UI组件, 标题关键词过滤
    const titleItems = [
        // 启用 播放页关键词过滤
        new CheckboxItem({
            itemID: GM_KEYS.black.title.statusKey,
            description: '启用 标题关键词过滤',
            enableFunc: () => {
                videoTitleFilter.enable()
                check(true)
            },
            disableFunc: () => {
                videoTitleFilter.disable()
                check(true)
            },
        }),
        // 编辑 关键词黑名单
        new ButtonItem({
            itemID: 'video-title-keyword-edit-button',
            description: '编辑 标题关键词黑名单（支持正则）',
            name: '编辑',
            // 按钮功能：打开编辑器
            itemFunc: () => {
                new WordList(
                    GM_KEYS.black.title.valueKey,
                    '标题关键词 黑名单',
                    `每行一个关键词或正则，不区分大小写\n正则默认iu模式，无需flag，语法：/abc|\\d+/`,
                    (values: string[]) => {
                        videoTitleFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(
        new Group('video-title-keyword-filter-group', '播放页 标题关键词过滤', titleItems),
    )

    // UI组件, bvid过滤
    const bvidItems = [
        // 启用 播放页 BV号过滤
        new CheckboxItem({
            itemID: GM_KEYS.black.bvid.statusKey,
            description: '启用 BV号过滤 (右键单击标题)',
            enableFunc: () => {
                // 启用 右键功能
                isContextMenuBvidEnable = true
                contextMenuFunc()
                videoBvidFilter.enable()
                check(true)
            },
            disableFunc: () => {
                // 禁用 右键功能
                isContextMenuBvidEnable = false
                videoBvidFilter.disable()
                check(true)
            },
        }),
        // 编辑 BV号黑名单
        new ButtonItem({
            itemID: 'video-bvid-edit-button',
            description: '编辑 BV号黑名单',
            name: '编辑',
            // 按钮功能：打开编辑器
            itemFunc: () => {
                new WordList(
                    GM_KEYS.black.bvid.valueKey,
                    'BV号 黑名单',
                    `每行一个BV号，保存时自动去重`,
                    (values: string[]) => {
                        videoBvidFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(new Group('video-bvid-filter-group', '播放页 BV号过滤', bvidItems))

    const otherItems = [
        // 启用 相关视频 暂存数据过滤
        new CheckboxItem({
            itemID: GM_KEYS.black.related.statusKey,
            description: '相关视频 暂存数据过滤 (实验功能)\n自动替换 接下来播放\n启用时 修改其他视频过滤设置需刷新',
            enableFunc: () => {
                isRelatedFilterEnable = true
                checkRelated()
            },
            disableFunc: () => {
                isRelatedFilterEnable = false
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(new Group('video-other-filter-group', '播放页 其他过滤', otherItems))

    // UI组件, 免过滤和白名单
    const whitelistItems = [
        // 启用 播放页UP主白名单
        new CheckboxItem({
            itemID: GM_KEYS.white.uploader.statusKey,
            description: '启用 UP主白名单',
            enableFunc: () => {
                videoUploaderWhiteFilter.enable()
                check(true)
            },
            disableFunc: () => {
                videoUploaderWhiteFilter.disable()
                check(true)
            },
        }),
        // 编辑 UP主白名单
        new ButtonItem({
            itemID: 'video-uploader-whitelist-edit-button',
            description: '编辑 UP主白名单',
            name: '编辑',
            // 按钮功能：打开编辑器
            itemFunc: () => {
                new WordList(
                    GM_KEYS.white.uploader.valueKey,
                    'UP主 白名单',
                    `每行一个UP主昵称，保存时自动去重`,
                    (values: string[]) => {
                        videoUploaderWhiteFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
        // 启用 播放页关键词白名单
        new CheckboxItem({
            itemID: GM_KEYS.white.title.statusKey,
            description: '启用 标题关键词白名单',
            enableFunc: () => {
                videoTitleWhiteFilter.enable()
                check(true)
            },
            disableFunc: () => {
                videoTitleWhiteFilter.disable()
                check(true)
            },
        }),
        // 编辑 关键词白名单
        new ButtonItem({
            itemID: 'video-title-keyword-whitelist-edit-button',
            description: '编辑 标题关键词白名单（支持正则）',
            name: '编辑',
            // 按钮功能：打开编辑器
            itemFunc: () => {
                new WordList(
                    GM_KEYS.white.title.valueKey,
                    '标题关键词 白名单',
                    `每行一个关键词或正则，不区分大小写\n正则默认iu模式，无需flag，语法：/abc|\\d+/`,
                    (values: string[]) => {
                        videoTitleWhiteFilter.setParam(values)
                        check(true)
                    },
                ).show()
            },
        }),
    ]
    videoPageVideoFilterGroupList.push(
        new Group('video-whitelist-filter-group', '播放页 白名单设定 (免过滤)', whitelistItems),
    )
}

export { videoPageVideoFilterGroupList }
