import { GM_getValue } from '$'
import { Group } from '../types/group'
import { ICheckboxItem, INumberItem, IRadioItem } from '../types/item'
import { isPageBangumi, isPageHomepage, isPagePlaylist, isPageVideo } from '../utils/pageType'

import { bangumiRules } from './rules/bangumi/index'
import { channelRules } from './rules/channel/index'
import { commentRules } from './rules/comment/index'
import { commonRules } from './rules/common/index'
import { dynamicRules } from './rules/dynamic/index'
import { homepageRules } from './rules/homepage/index'
import { liveRules } from './rules/live/index'
import { popularRules } from './rules/popular/index'
import { searchRules } from './rules/search/index'
import { spaceRules } from './rules/space/index'
import { videoRules } from './rules/video/index'
import { watchlaterRules } from './rules/watchlater/index'

import bangumiCSS from './rules/bangumi/index.scss?inline'
import channelCSS from './rules/channel/index.scss?inline'
import commentCSS from './rules/comment/index.scss?inline'
import commonCSS from './rules/common/index.scss?inline'
import dynamicCSS from './rules/dynamic/index.scss?inline'
import homepageCSS from './rules/homepage/index.scss?inline'
import liveCSS from './rules/live/index.scss?inline'
import popularCSS from './rules/popular/index.scss?inline'
import searchCSS from './rules/search/index.scss?inline'
import spaceCSS from './rules/space/index.scss?inline'
import videoCSS from './rules/video/index.scss?inline'
import watchlaterCSS from './rules/watchlater/index.scss?inline'

const loadCheckboxItem = (item: ICheckboxItem) => {
    const isEnable = GM_getValue(item.id, item.defaultEnable)
    if (isEnable) {
        if (!item.noStyle) {
            document.documentElement?.setAttribute(item.id, '')
        }
        if (item.enableFn) {
            if (item.enableFnRunAt === 'document-start') {
                item.enableFn()?.then().catch()
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    item.enableFn!()?.then().catch()
                })
            }
        }
    }
}

const loadNumberItem = (item: INumberItem) => {
    const value = GM_getValue(item.id, item.defaultValue)
    if (value !== item.disableValue) {
        item.fn(value)?.then().catch()
        document.documentElement?.setAttribute(item.id, '')
    }
}

const loadRadioItem = (item: IRadioItem) => {
    for (const radio of item.radios) {
        if (GM_getValue(radio.id)) {
            document.documentElement?.setAttribute(radio.id, '')
            return
        }
    }
    if (item.defaultEnableId) {
        document.documentElement?.setAttribute(item.defaultEnableId, '')
    }
}

const loadGroups = (groups: Group[]) => {
    for (const group of groups) {
        for (const item of group.items) {
            switch (item.type) {
                case 'checkbox':
                    loadCheckboxItem(item)
                    break
                case 'number':
                    loadNumberItem(item)
                    break
                case 'radio':
                    loadRadioItem(item)
                    break
            }
        }
    }
}

const loadStyle = (css: string) => {
    const e = document.createElement('style')
    e.innerHTML = css
    e.className = 'bili-cleaner'
    document.documentElement?.appendChild(e)
}

/** 加载模块 */
export const loadModules = () => {
    if (isPageHomepage()) {
        loadGroups(homepageRules)
    }
    if (isPageVideo() || isPagePlaylist()) {
        loadGroups(videoRules)
    }
    if (isPageBangumi()) {
        loadGroups(bangumiRules)
    }
}

/** 载入样式，需在document.head出现后执行 */
export const loadStyles = () => {
    if (isPageHomepage()) {
        loadStyle(homepageCSS)
    }
    if (isPageVideo() || isPagePlaylist()) {
        loadStyle(videoCSS)
    }
    if (isPageBangumi()) {
        loadStyle(bangumiCSS)
    }
}
