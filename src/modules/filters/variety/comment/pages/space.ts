import { GM_getValue, GM_setValue } from '$'
import settings from '../../../../../settings'
import { Group } from '../../../../../types/collection'
import { IMainFilter, SelectorResult, SubFilterPair } from '../../../../../types/filter'
import { error, log } from '../../../../../utils/logger'
import { orderedUniq, showEle, waitForEle } from '../../../../../utils/tool'
import { coreCheck } from '../../../core/core'
import {
    CommentBotFilter,
    CommentCallBotFilter,
    CommentCallUserFilter,
    CommentCallUserOnlyFilter,
    CommentContentFilter,
    CommentLevelFilter,
    CommentUsernameFilter,
} from '../subFilters/black'
import { CommentIsLinkFilter, CommentIsNoteFilter, CommentIsPinFilter, CommentIsUpFilter } from '../subFilters/white'

const GM_KEYS = {
    black: {
        username: {
            statusKey: 'dynamic-comment-username-filter-status',
            valueKey: 'global-comment-username-filter-value',
        },
        content: {
            statusKey: 'dynamic-comment-content-filter-status',
            valueKey: 'global-comment-content-filter-value',
        },
        level: {
            statusKey: 'dynamic-comment-level-filter-status',
            valueKey: 'global-comment-level-filter-value',
        },
        bot: {
            statusKey: 'dynamic-comment-bot-filter-status',
        },
        callBot: {
            statusKey: 'dynamic-comment-call-bot-filter-status',
        },
        callUser: {
            statusKey: 'dynamic-comment-call-user-filter-status',
        },
        callUserOnly: {
            statusKey: 'dynamic-comment-call-user-only-filter-status',
        },
    },
    white: {
        root: {
            statusKey: 'dynamic-comment-root-whitelist-status',
        },
        sub: {
            statusKey: 'dynamic-comment-sub-whitelist-status',
        },
        isUp: {
            statusKey: 'dynamic-comment-uploader-whitelist-status',
        },
        isPin: {
            statusKey: 'dynamic-comment-pinned-whitelist-status',
        },
        isNote: {
            statusKey: 'dynamic-comment-note-whitelist-status',
        },
        isLink: {
            statusKey: 'dynamic-comment-link-whitelist-status',
        },
    },
}

// 一二级评论信息提取
const selectorFns = {
    root: {
        username: (comment: HTMLElement): SelectorResult => {
            return comment.querySelector('.root-reply-container .user-name')?.textContent?.trim()
        },
        content: (comment: HTMLElement): SelectorResult => {
            return comment
                .querySelector('.root-reply-container .reply-content')
                ?.textContent?.trim()
                .replace(/@[^@ ]+?( |$)/g, '')
                .trim()
        },
        callUser: (comment: HTMLElement): SelectorResult => {
            return comment
                .querySelector('.root-reply-container .reply-content .jump-link.user')
                ?.textContent?.replace('@', '')
                .trim()
        },
        callUserOnly: (comment: HTMLElement): SelectorResult => {
            return (
                comment
                    .querySelector('.root-reply-container .reply-content')
                    ?.textContent?.trim()
                    .replace(/@[^@ ]+/g, '')
                    .trim() === ''
            )
        },
        level: (comment: HTMLElement): SelectorResult => {
            const c = comment.querySelector('.root-reply-container .user-level')?.className
            const lv = c?.match(/level-([1-6])/)?.[1] // 忽略level-hardcore
            return lv ? parseInt(lv) : undefined
        },
        isUp: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.root-reply-container .up-icon')
        },
        isPin: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.root-reply-container .top-icon')
        },
        isNote: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.root-reply-container .note-prefix')
        },
        isLink: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.root-reply-container .jump-link:is(.normal, .video)')
        },
    },
    sub: {
        username: (comment: HTMLElement): SelectorResult => {
            return comment.querySelector('.sub-user-name')?.textContent?.trim()
        },
        content: (comment: HTMLElement): SelectorResult => {
            return comment
                .querySelector('.reply-content')
                ?.textContent?.trim()
                ?.replace(/@[^@ ]+?( |$)/g, '')
                .replace(/^回复 *:?/, '')
                .trim()
        },
        callUser: (comment: HTMLElement): SelectorResult => {
            return comment
                .querySelector('.reply-content')
                ?.textContent?.trim()
                .replace(/^回复 ?@[^@ ]+? ?:/, '')
                .trim()
                ?.match(/@[^@ ]+( |$)/)?.[0]
                .replace('@', '')
                .trim()
        },
        callUserOnly: (comment: HTMLElement): SelectorResult => {
            return (
                comment
                    .querySelector('.reply-content')
                    ?.textContent?.trim()
                    .replace(/@[^@ ]+/g, '')
                    .trim() === ''
            )
        },
        level: (comment: HTMLElement): SelectorResult => {
            const c = comment.querySelector('.sub-user-level')?.className
            const lv = c?.match(/level-([1-6])/)?.[1] // 忽略level-hardcore
            return lv ? parseInt(lv) : undefined
        },
        isUp: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.sub-up-icon')
        },
        isLink: (comment: HTMLElement): SelectorResult => {
            return !!comment.querySelector('.sub-reply-content .jump-link:is(.normal, .video)')
        },
    },
}

let isRootWhite = false
let isSubWhite = false

class CommentFilterSpace implements IMainFilter {
    target: HTMLElement | undefined

    // 黑名单
    commentUsernameFilter = new CommentUsernameFilter()
    commentContentFilter = new CommentContentFilter()
    commentLevelFilter = new CommentLevelFilter()
    commentBotFilter = new CommentBotFilter()
    commentCallBotFilter = new CommentCallBotFilter()
    commentCallUserFilter = new CommentCallUserFilter()
    commentCallUserOnlyFilter = new CommentCallUserOnlyFilter()
    // 白名单
    commentIsUpFilter = new CommentIsUpFilter()
    commentIsPinFilter = new CommentIsPinFilter()
    commentIsNoteFilter = new CommentIsNoteFilter()
    commentIsLinkFilter = new CommentIsLinkFilter()

    init() {
        // 黑名单
        const bots = [
            // 8455326 @机器工具人
            // 234978716 @有趣的程序员
            // 1141159409 @AI视频小助理
            // 437175450 @AI视频小助理总结一下 (误伤)
            // 1692825065 @AI笔记侠
            // 690155730 @AI视频助手
            // 689670224 @哔哩哔理点赞姬
            // 3494380876859618 @课代表猫
            // 1168527940 @AI课代表呀
            // 439438614 @木几萌Moe
            // 1358327273 @星崽丨StarZai
            // 3546376048741135 @AI沈阳美食家
            // 1835753760 @AI识片酱 // 听歌识曲，免除过滤
            // 9868463 @AI头脑风暴
            // 358243654 @GPT_5
            // 393788832 @Juice_AI
            // 91394217 @AI全文总结
            // 473018527 @AI视频总结
            // 3546639035795567 @AI总结视频
            // 605801219 @AI工具集
            '机器工具人',
            '有趣的程序员',
            'AI视频小助理',
            'AI视频小助理总结一下',
            'AI笔记侠',
            'AI视频助手',
            '哔哩哔理点赞姬',
            '课代表猫',
            'AI课代表呀',
            '木几萌Moe',
            '星崽丨StarZai',
            'AI沈阳美食家',
            'AI头脑风暴',
            'GPT_5',
            'Juice_AI',
            'AI全文总结',
            'AI视频总结',
            'AI总结视频',
            'AI工具集',
        ]
        this.commentUsernameFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.username.valueKey}`, []))
        this.commentContentFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.content.valueKey}`, []))
        this.commentLevelFilter.setParam(GM_getValue(`BILICLEANER_${GM_KEYS.black.level.valueKey}`, 0))
        this.commentBotFilter.setParam(bots)
        this.commentCallBotFilter.setParam(bots)
        this.commentCallUserFilter.setParam([`/./`])
    }

    async check(mode?: 'full' | 'incr') {
        if (location.host === 'space.bilibili.com' && !location.pathname.includes('/dynamic')) {
            return
        }
        if (!this.target) {
            return
        }

        let revertAll = false
        const timer = performance.now()
        if (
            !(
                this.commentUsernameFilter.isEnable ||
                this.commentContentFilter.isEnable ||
                this.commentLevelFilter.isEnable ||
                this.commentBotFilter.isEnable ||
                this.commentCallBotFilter.isEnable ||
                this.commentCallUserFilter.isEnable ||
                this.commentCallUserOnlyFilter.isEnable
            )
        ) {
            revertAll = true
        }

        // 提取元素：一级评论、二级评论
        const rootSelector = `.reply-item` + (mode === 'incr' ? `:not([${settings.filterSign}])` : '')
        const subSelector = `.sub-reply-item` + (mode === 'incr' ? `:not([${settings.filterSign}])` : '')
        const rootComments = Array.from(this.target.querySelectorAll<HTMLElement>(rootSelector))
        const subComments = Array.from(this.target.querySelectorAll<HTMLElement>(subSelector))

        // rootComments.forEach((v) => {
        //     log(
        //         [
        //             `root comment`,
        //             `username: ${selectorFns.root.username(v)}`,
        //             `content: ${selectorFns.root.content(v)}`,
        //             `callUser: ${selectorFns.root.callUser(v)}`,
        //             `callUserOnly: ${selectorFns.root.callUserOnly(v)}`,
        //             `level: ${selectorFns.root.level(v)}`,
        //             `isUp: ${selectorFns.root.isUp(v)}`,
        //             `isPin: ${selectorFns.root.isPin(v)}`,
        //             `isNote: ${selectorFns.root.isNote(v)}`,
        //             `isLink: ${selectorFns.root.isLink(v)}`,
        //         ].join('\n'),
        //     )
        // })
        // subComments.forEach((v) => {
        //     log(
        //         [
        //             `sub comment`,
        //             `username: ${selectorFns.sub.username(v)}`,
        //             `content: ${selectorFns.sub.content(v)}`,
        //             `callUser: ${selectorFns.sub.callUser(v)}`,
        //             `callUserOnly: ${selectorFns.sub.callUserOnly(v)}`,
        //             `level: ${selectorFns.sub.level(v)}`,
        //             `isUp: ${selectorFns.sub.isUp(v)}`,
        //             `isLink: ${selectorFns.sub.isLink(v)}`,
        //         ].join('\n'),
        //     )
        // })

        if (!rootComments.length && !subComments.length) {
            return
        }
        if (isRootWhite || revertAll) {
            rootComments.forEach((el) => showEle(el))
        }
        if (isSubWhite || revertAll) {
            subComments.forEach((el) => showEle(el))
        }
        if (revertAll) {
            return
        }

        // 构建黑白检测任务
        let rootBlackCnt = 0
        let subBlackCnt = 0
        if (!isRootWhite && rootComments.length) {
            const blackPairs: SubFilterPair[] = []
            this.commentUsernameFilter.isEnable &&
                blackPairs.push([this.commentUsernameFilter, selectorFns.root.username])
            this.commentContentFilter.isEnable && blackPairs.push([this.commentContentFilter, selectorFns.root.content])
            this.commentLevelFilter.isEnable && blackPairs.push([this.commentLevelFilter, selectorFns.root.level])
            this.commentBotFilter.isEnable && blackPairs.push([this.commentBotFilter, selectorFns.root.username])
            this.commentCallBotFilter.isEnable &&
                blackPairs.push([this.commentCallBotFilter, selectorFns.root.callUser])
            this.commentCallUserFilter.isEnable &&
                blackPairs.push([this.commentCallUserFilter, selectorFns.root.callUser])
            this.commentCallUserOnlyFilter.isEnable &&
                blackPairs.push([this.commentCallUserOnlyFilter, selectorFns.root.callUserOnly])

            const whitePairs: SubFilterPair[] = []
            this.commentIsUpFilter.isEnable && whitePairs.push([this.commentIsUpFilter, selectorFns.root.isUp])
            this.commentIsPinFilter.isEnable && whitePairs.push([this.commentIsPinFilter, selectorFns.root.isPin])
            this.commentIsNoteFilter.isEnable && whitePairs.push([this.commentIsNoteFilter, selectorFns.root.isNote])
            this.commentIsLinkFilter.isEnable && whitePairs.push([this.commentIsLinkFilter, selectorFns.root.isLink])

            rootBlackCnt = await coreCheck(rootComments, true, blackPairs, whitePairs)
        }
        if (!isSubWhite && subComments.length) {
            const blackPairs: SubFilterPair[] = []
            this.commentUsernameFilter.isEnable &&
                blackPairs.push([this.commentUsernameFilter, selectorFns.sub.username])
            this.commentContentFilter.isEnable && blackPairs.push([this.commentContentFilter, selectorFns.sub.content])
            this.commentLevelFilter.isEnable && blackPairs.push([this.commentLevelFilter, selectorFns.sub.level])
            this.commentBotFilter.isEnable && blackPairs.push([this.commentBotFilter, selectorFns.sub.username])
            this.commentCallBotFilter.isEnable && blackPairs.push([this.commentCallBotFilter, selectorFns.sub.callUser])
            this.commentCallUserFilter.isEnable &&
                blackPairs.push([this.commentCallUserFilter, selectorFns.sub.callUser])
            this.commentCallUserOnlyFilter.isEnable &&
                blackPairs.push([this.commentCallUserOnlyFilter, selectorFns.sub.callUserOnly])

            const whitePairs: SubFilterPair[] = []
            this.commentIsUpFilter.isEnable && whitePairs.push([this.commentIsUpFilter, selectorFns.sub.isUp])
            this.commentIsLinkFilter.isEnable && whitePairs.push([this.commentIsLinkFilter, selectorFns.sub.isLink])

            subBlackCnt = await coreCheck(subComments, true, blackPairs, whitePairs)
        }

        const time = (performance.now() - timer).toFixed(1)
        log(
            `CommentFilterSpace hide ${rootBlackCnt} in ${rootComments.length} root, ${subBlackCnt} in ${subComments.length} sub, mode=${mode}, time=${time}`,
        )
    }

    observe() {
        waitForEle(document, '#app', (node: HTMLElement): boolean => {
            return node.id === 'app'
        }).then((ele) => {
            if (ele) {
                this.target = ele
                log('CommentFilterSpace target appear')
                this.check('full').then().catch()
                const commentObserver = new MutationObserver(() => {
                    this.check('incr').then().catch()
                })
                commentObserver.observe(this.target, { childList: true, subtree: true })
            }
        })
    }
}
//==================================================================================================

const mainFilter = new CommentFilterSpace()

export const commentFilterSpaceEntry = async () => {
    mainFilter.init()
    mainFilter.observe()
}

export const commentFilterSpaceGroups: Group[] = [
    {
        name: '评论用户过滤',
        items: [
            {
                type: 'switch',
                id: GM_KEYS.black.username.statusKey,
                name: '启用 评论用户过滤 (右键单击用户名)',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentUsernameFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentUsernameFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'editor',
                id: GM_KEYS.black.username.valueKey,
                name: '编辑 评论用户黑名单',
                description: ['本黑名单与UP主黑名单互不影响', '右键屏蔽的用户会出现在首行'],
                editorTitle: '评论区 用户黑名单',
                editorDescription: ['每行一个用户名，保存时自动去重'],
                saveFn: async () => {
                    mainFilter.commentUsernameFilter.setParam(GM_getValue(GM_KEYS.black.username.valueKey, []))
                    mainFilter.check('full').then().catch()
                },
            },
        ],
    },
    {
        name: '评论内容过滤',
        items: [
            {
                type: 'switch',
                id: GM_KEYS.black.content.statusKey,
                name: '启用 评论关键词过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentContentFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentContentFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'editor',
                id: GM_KEYS.black.content.valueKey,
                name: '编辑 评论关键词黑名单',
                editorTitle: '评论关键词 黑名单',
                editorDescription: [
                    '每行一个关键词或正则，不区分大小写',
                    '请勿使用过于激进的关键词或正则',
                    '正则默认iu模式，无需flag，语法：/abc|\\d+/',
                ],
                saveFn: async () => {
                    mainFilter.commentContentFilter.setParam(GM_getValue(GM_KEYS.black.content.valueKey, []))
                    mainFilter.check('full').then().catch()
                },
            },
        ],
    },
    {
        name: '按类型过滤',
        items: [
            {
                type: 'switch',
                id: GM_KEYS.black.callBot.statusKey,
                name: '过滤 召唤AI的评论',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentCallBotFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentCallBotFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.black.bot.statusKey,
                name: '过滤 AI发布的评论',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentBotFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentBotFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.black.callUserOnly.statusKey,
                name: '过滤 只含 @其他用户 的评论',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentCallUserOnlyFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentCallUserOnlyFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.black.callUser.statusKey,
                name: '过滤 包含 @其他用户 的评论',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentCallUserFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentCallUserFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
        ],
    },
    {
        name: '等级过滤',
        items: [
            {
                type: 'switch',
                id: GM_KEYS.black.level.statusKey,
                name: '启用 用户等级过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentLevelFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentLevelFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'number',
                id: GM_KEYS.black.level.valueKey,
                name: '设定最低等级 (0~6)',
                minValue: 0,
                maxValue: 6,
                defaultValue: 0,
                disableValue: 0,
                fn: (value: number) => {
                    mainFilter.commentLevelFilter.setParam(value)
                    mainFilter.check('full').then().catch()
                },
            },
        ],
    },
    {
        name: '白名单 免过滤',
        items: [
            {
                type: 'switch',
                id: GM_KEYS.white.root.statusKey,
                name: '一级评论(主评论) 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    isRootWhite = true
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    isRootWhite = false
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.white.sub.statusKey,
                name: '二级评论(回复) 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    isSubWhite = true
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    isSubWhite = false
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.white.isUp.statusKey,
                name: 'UP主的评论 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentIsUpFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentIsUpFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.white.isPin.statusKey,
                name: '置顶评论 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentIsPinFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentIsPinFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.white.isNote.statusKey,
                name: '笔记/图片评论 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentIsNoteFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentIsNoteFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
            {
                type: 'switch',
                id: GM_KEYS.white.isLink.statusKey,
                name: '含超链接的评论 免过滤',
                defaultEnable: false,
                noStyle: true,
                enableFn: () => {
                    mainFilter.commentIsLinkFilter.enable()
                    mainFilter.check('full').then().catch()
                },
                disableFn: () => {
                    mainFilter.commentIsLinkFilter.disable()
                    mainFilter.check('full').then().catch()
                },
            },
        ],
    },
]

// 右键菜单回调
export const commentFilterSpaceAddUsername = async (username: string) => {
    username = username.trim()
    if (!username) {
        return
    }
    try {
        mainFilter.commentUsernameFilter.addParam(username)
        mainFilter.check('full').then().catch()
        const arr: string[] = GM_getValue(GM_KEYS.black.username.valueKey, [])
        arr.unshift(username)
        GM_setValue(GM_KEYS.black.username.valueKey, orderedUniq(arr))
    } catch (err) {
        error(`commentFilterSpaceAddUsername add username ${username} failed`, err)
    }
}
