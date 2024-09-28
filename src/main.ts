import { GM_registerMenuCommand } from '$'
import { createApp } from 'vue'
import { loadModules } from './modules'
import css from './style.css?inline'
import { waitForBody } from './utils/init'
import { log } from './utils/logger'
import { upgrade } from './utils/upgrade'
import CommentFilterPanel from './views/CommentFilterPanel.vue'
import ContextMenu from './views/ContextMenu.vue'
import DynamicFilterPanel from './views/DynamicFilterPanel.vue'
import RulePanel from './views/RulePanel.vue'
import VideoFilterPanel from './views/VideoFilterPanel.vue'

log(`start, mode: ${import.meta.env.MODE}, url: ${location.href}`)

upgrade()

loadModules()

// 创建插件面板用shadowDOM节点
const wrap = document.createElement('div')
wrap.id = 'bili-cleaner'
const root = wrap.attachShadow({ mode: 'open' })
const style = document.createElement('style')
style.textContent = css
root.appendChild(style)

/**
 * dev mode inline css HMR
 * @see https://github.com/lisonge/vite-plugin-monkey/blob/47ac609/playground/test-shadow-dom/src/hmr_inline_css.ts
 */
if (import.meta.env.DEV && import.meta.hot) {
    import.meta.hot.accept('./style.css?inline', (newModule) => {
        const newCSS = newModule?.default as string
        style.textContent = newCSS ?? ''
    })
}

waitForBody().then(() => {
    document.body.appendChild(wrap)
})

const createView = (view: any) => {
    createApp(view).mount(
        (() => {
            const app = document.createElement('div')
            root.appendChild(app)
            return app
        })(),
    )
}

// 右键菜单
createView(ContextMenu)

const menu = () => {
    GM_registerMenuCommand('✅页面净化优化', () => {
        createView(RulePanel)
    })
    GM_registerMenuCommand('✅视频过滤设置', () => {
        createView(VideoFilterPanel)
    })
    GM_registerMenuCommand('✅评论过滤设置', () => {
        createView(CommentFilterPanel)
    })
    GM_registerMenuCommand('✅动态过滤设置', () => {
        createView(DynamicFilterPanel)
    })
}

menu()
