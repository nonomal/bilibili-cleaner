import { Item } from '../../../../types/item'

export const bangumiBasicItems: Item[] = [
    {
        id: 'video-page-simple-share',
        type: 'checkbox',
        description: '净化分享功能',
        defaultEnable: true,
        enableFn: async () => {
            // 监听shareBtn出现
            let counter = 0
            const id = setInterval(() => {
                counter++
                const shareBtn = document.getElementById('share-container-id')
                if (shareBtn) {
                    clearInterval(id)
                    // 新增click事件覆盖剪贴板
                    shareBtn.addEventListener('click', () => {
                        const mainTitle = document.querySelector("[class^='mediainfo_mediaTitle']")?.textContent
                        const subTitle = document.getElementById('player-title')?.textContent
                        const shareText = `《${mainTitle}》${subTitle} \nhttps://www.bilibili.com${location.pathname}`
                        navigator.clipboard.writeText(shareText).then().catch()
                    })
                } else if (counter > 50) {
                    clearInterval(id)
                }
            }, 200)
        },
        enableFnRunAt: 'document-end',
    },
    {
        id: 'video-page-hide-fixed-header',
        type: 'checkbox',
        description: '顶栏 滚动页面后不再吸附顶部',
    },
]
