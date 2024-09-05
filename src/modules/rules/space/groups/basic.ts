import { Item } from '../../../../types/item'

export const spaceBasicItems: Item[] = [
    {
        id: 'space-page-redirect-to-video',
        type: 'checkbox',
        description: '打开用户主页 自动跳转到投稿',
        noStyle: true,
        enableFn: () => {
            if (/\/\d+\/?($|\?)/.test(location.pathname)) {
                const userid = location.pathname.match(/\d+/)?.[0]
                if (userid) {
                    location.href = `https://space.bilibili.com/${userid}/video`
                }
            }
        },
    },
]
