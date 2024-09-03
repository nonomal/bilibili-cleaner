import { createApp } from 'vue'
import RuleMenu from './views/RuleMenu.vue'
import VideoFilterMenu from './views/VideoFilterMenu.vue'
import CommentFilterMenu from './views/CommentFilterMenu.vue'
import DynFilterMenu from './views/DynFilterMenu.vue'

import { GM_unregisterMenuCommand, GM_registerMenuCommand, GM_getValue } from '$'
import {
    isPageHomepage,
    isPageVideo,
    isPagePopular,
    isPageSearch,
    isPageChannel,
    isPagePlaylist,
    isPageSpace,
    isPageDynamic,
    isPageBangumi,
} from './utils/pageType'

// 模块生效
const loadModule = () => {}

// 样式注入
const injectCSS = () => {}

// 插件菜单
const menu = () => {
    const regIDs: string[] = []
    const unregister = () => {
        regIDs.forEach((regID) => GM_unregisterMenuCommand(regID))
        regIDs.splice(0, regIDs.length)
    }
    const register = () => {
        regIDs.push(
            GM_registerMenuCommand('✅页面净化优化', () => {
                createApp(RuleMenu).mount(
                    (() => {
                        const app = document.createElement('div')
                        document.body.append(app)
                        return app
                    })(),
                )
            }),
        )

        if (
            isPageHomepage() ||
            isPageVideo() ||
            isPagePopular() ||
            isPageSearch() ||
            isPageChannel() ||
            isPagePlaylist() ||
            isPageSpace()
        ) {
            regIDs.push(
                GM_registerMenuCommand('✅视频过滤设置', () => {
                    createApp(VideoFilterMenu).mount(
                        (() => {
                            const app = document.createElement('div')
                            document.body.append(app)
                            return app
                        })(),
                    )
                }),
            )
        }

        if (isPageDynamic()) {
            regIDs.push(
                GM_registerMenuCommand('✅动态过滤设置', () => {
                    createApp(DynFilterMenu).mount(
                        (() => {
                            const app = document.createElement('div')
                            document.body.append(app)
                            return app
                        })(),
                    )
                }),
            )
        }

        if (isPageVideo() || isPageBangumi() || isPagePlaylist() || isPageDynamic() || isPageSpace()) {
            regIDs.push(
                GM_registerMenuCommand('✅评论过滤设置', () => {
                    createApp(CommentFilterMenu).mount(
                        (() => {
                            const app = document.createElement('div')
                            document.body.append(app)
                            return app
                        })(),
                    )
                }),
            )
        }

        // // 快捷按钮
        // if (
        //     isPageHomepage() ||
        //     isPageVideo() ||
        //     isPagePopular() ||
        //     isPageSearch() ||
        //     isPageChannel() ||
        //     isPagePlaylist() ||
        //     isPageSpace()
        // ) {
        //     const videoFilterSideBtnID = 'video-filter-side-btn'
        //     const sideBtn = new SideBtn(videoFilterSideBtnID, '视频过滤', () => {
        //         panel.isShowing ? panel.hide() : createPanelWithMode('videoFilter', VIDEO_FILTER_GROUPS)
        //     })
        //     if (GM_getValue(`BILICLEANER_${videoFilterSideBtnID}`, false)) {
        //         sideBtn.enable()
        //         regIDs.push(
        //             GM_registerMenuCommand('⚡️关闭 视频过滤 快捷按钮', () => {
        //                 sideBtn.disable()
        //                 unregister()
        //                 register()
        //             }),
        //         )
        //     } else {
        //         regIDs.push(
        //             GM_registerMenuCommand('⚡️启用 视频过滤 快捷按钮', () => {
        //                 sideBtn.enable()
        //                 unregister()
        //                 register()
        //             }),
        //         )
        //     }
        // }
        // if (isPageVideo() || isPageBangumi() || isPagePlaylist() || isPageDynamic() || isPageSpace()) {
        //     const commentFilterSideBtnID = 'comment-filter-side-btn'
        //     const sideBtn = new SideBtn(commentFilterSideBtnID, '评论过滤', () => {
        //         panel.isShowing ? panel.hide() : createPanelWithMode('commentFilter', COMMENT_FILTER_GROUPS)
        //     })
        //     if (GM_getValue(`BILICLEANER_${commentFilterSideBtnID}`, false)) {
        //         sideBtn.enable()
        //         regIDs.push(
        //             GM_registerMenuCommand('⚡️关闭 评论过滤 快捷按钮', () => {
        //                 sideBtn.disable()
        //                 unregister()
        //                 register()
        //             }),
        //         )
        //     } else {
        //         regIDs.push(
        //             GM_registerMenuCommand('⚡️启用 评论过滤 快捷按钮', () => {
        //                 sideBtn.enable()
        //                 unregister()
        //                 register()
        //             }),
        //         )
        //     }
        // }
    }
    register()
}
