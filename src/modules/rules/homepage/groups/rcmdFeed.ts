import { Item } from '../../../../types/item'
import fetchHook from '../../../../utils/fetch'
import { waitForEle, debounce } from '../../../../utils/tool'

export const homepageRcmdFeedItems: Item[] = [
    {
        id: 'homepage-increase-rcmd-list-font-size',
        type: 'checkbox',
        description: '增大 视频信息字号',
    },
    {
        id: 'homepage-hide-no-interest',
        type: 'checkbox',
        description: '隐藏 视频负反馈 恢复标题宽度',
    },
    {
        id: 'homepage-hide-up-info-icon',
        type: 'checkbox',
        description: '隐藏 视频tag (已关注/1万点赞)',
    },
    {
        id: 'homepage-hide-video-info-date',
        type: 'checkbox',
        description: '隐藏 发布时间',
    },
    {
        id: 'homepage-hide-danmaku-count',
        type: 'checkbox',
        description: '隐藏 弹幕数',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-bili-watch-later-tip',
        type: 'checkbox',
        description: '隐藏 稍后再看提示语',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-bili-watch-later',
        type: 'checkbox',
        description: '隐藏 稍后再看按钮',
    },
    {
        id: 'homepage-hide-inline-player-danmaku',
        type: 'checkbox',
        description: '隐藏 视频预览中的弹幕',
    },
    {
        id: 'homepage-hide-ad-card',
        type: 'checkbox',
        description: '隐藏 广告',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-live-card-recommend',
        type: 'checkbox',
        description: '隐藏 直播间推荐',
        defaultEnable: true,
    },
    {
        id: 'homepage-simple-sub-area-card-recommend',
        type: 'checkbox',
        description: '简化 分区视频推荐',
        defaultEnable: true,
    },
    {
        id: 'homepage-hide-sub-area-card-recommend',
        type: 'checkbox',
        description: '隐藏 分区视频推荐',
    },
    {
        id: 'homepage-hide-skeleton-animation',
        type: 'checkbox',
        description: '禁用 视频载入 骨架动效',
    },
    {
        id: 'homepage-hide-skeleton',
        type: 'checkbox',
        description: '隐藏 视频载入 骨架',
    },
    {
        id: 'homepage-increase-rcmd-load-size',
        type: 'checkbox',
        description: '扩增 动态加载视频数量 (实验功能)',
        enableFn: () => {
            fetchHook.addPreFn((input: RequestInfo | URL, init: RequestInit | undefined): RequestInfo | URL => {
                if (
                    typeof input === 'string' &&
                    input.includes('api.bilibili.com') &&
                    input.includes('feed/rcmd') &&
                    init?.method?.toUpperCase() === 'GET'
                ) {
                    input = input.replace('&ps=12&', '&ps=24&')
                }
                return input
            })
        },
    },
    {
        id: 'homepage-rcmd-video-preload',
        type: 'checkbox',
        description: '启用 预加载下一屏 (实验功能)\n需开启 隐藏分区视频推荐',
        enableFn: async () => {
            waitForEle(document.body, '.load-more-anchor', (node: HTMLElement) => {
                return node.className === 'load-more-anchor'
            }).then((anchor) => {
                if (!anchor) {
                    return
                }
                const fireRcmdLoad = () => {
                    const firstSkeleton = document.querySelector(
                        '.bili-video-card:has(.bili-video-card__skeleton:not(.hide)):has(~ .load-more-anchor)',
                    ) as HTMLElement
                    if (!firstSkeleton || firstSkeleton.getBoundingClientRect().top > innerHeight * 2) {
                        return
                    }

                    anchor.classList.add('preload')
                    new Promise<void>((resolve) => {
                        const id = setInterval(() => {
                            const firstSkeleton = document.querySelector(
                                '.bili-video-card:has(.bili-video-card__skeleton:not(.hide)):has(~ .load-more-anchor)',
                            ) as HTMLElement
                            if (!firstSkeleton) {
                                clearInterval(id)
                                resolve()
                            }

                            if (firstSkeleton.getBoundingClientRect().top < innerHeight * 2) {
                                new Promise((resolve) => setTimeout(resolve, 20)).then(() => {
                                    window.dispatchEvent(new Event('scroll'))
                                })
                            } else {
                                clearInterval(id)
                                resolve()
                            }
                        }, 200)
                    }).then(() => {
                        anchor.classList.remove('preload')
                    })
                }

                fireRcmdLoad()

                const debounceFireRcmdLoad = debounce(fireRcmdLoad, 250, true)
                window.addEventListener('wheel', (e: WheelEvent) => {
                    if (e.deltaY > 0) {
                        debounceFireRcmdLoad()
                    }
                })
            })
        },
        enableFnRunAt: 'document-end',
    },
]
