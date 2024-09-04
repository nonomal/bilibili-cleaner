import { Item } from '../../../../types/item'

export const bangumiToolbarItems: Item[] = [
    {
        id: 'video-page-coin-disable-auto-like',
        type: 'checkbox',
        description: '投币时不自动点赞',
        noStyle: true,
        enableFn: async () => {
            const disableAutoLike = () => {
                let counter = 0
                const timer = setInterval(() => {
                    const checkbox = document.querySelector(
                        '.main-container [class^="dialogcoin_like_checkbox"] input',
                    ) as HTMLInputElement
                    if (checkbox) {
                        if (checkbox.checked) {
                            checkbox.click()
                        }
                        clearInterval(timer)
                    } else {
                        counter++
                        if (counter > 100) {
                            clearInterval(timer)
                        }
                    }
                }, 20)
            }
            const coinBtn = document.querySelector('#ogv_weslie_tool_coin_info') as HTMLElement | null
            if (coinBtn) {
                coinBtn.addEventListener('click', disableAutoLike)
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    const coinBtn = document.querySelector('#ogv_weslie_tool_coin_info') as HTMLElement | null
                    coinBtn?.addEventListener('click', disableAutoLike)
                })
            }
        },
    },
    {
        id: 'video-page-hide-video-share-popover',
        type: 'checkbox',
        description: '隐藏 分享按钮弹出菜单',
        defaultEnable: true,
    },
    {
        id: 'bangumi-page-hide-watch-together',
        type: 'checkbox',
        description: '隐藏 一起看 ★',
        defaultEnable: true,
    },
    {
        id: 'bangumi-page-hide-toolbar',
        type: 'checkbox',
        description: '隐藏 整个工具栏 (赞币转) ★',
    },
    {
        id: 'bangumi-page-hide-media-info',
        type: 'checkbox',
        description: '隐藏 作品介绍 ★',
    },
    {
        id: 'bangumi-page-simple-media-info',
        type: 'checkbox',
        description: '精简 作品介绍 ★',
        defaultEnable: true,
    },
    {
        id: 'bangumi-page-hide-sponsor-module',
        type: 'checkbox',
        description: '隐藏 承包榜 ★',
    },
]
