import { Group } from '../components/group'
import { CheckboxItem } from '../components/item'
import { isPageWatchlater } from '../utils/page-type'

const watchlaterGroupList: Group[] = []

if (isPageWatchlater()) {
    // 基本功能
    const basicItems = [
        // 使用 双列布局
        new CheckboxItem({
            itemID: 'watchlater-page-layout-2-column',
            description: '使用 双列布局',
            itemCSS: `
                .list-box > span {
                    display: grid !important;
                    grid-template-columns: repeat(2, calc(50% - 12px)) !important;
                    column-gap: 24px !important;
                    row-gap: 30px !important;
                }
                .watch-later-list {
                    margin-bottom: 50px !important;
                }
                .av-item {
                    width: unset !important;
                    margin: 0 !important;
                    padding: 0 0 0 36px !important;
                }
                .av-item .av-about {
                    display: flex !important;
                    flex-direction: column !important;
                    border-bottom: none !important;
                }
                .av-item .av-about .t {
                    width: unset !important;
                    overflow: unset !important;
                    text-wrap: wrap !important;
                    line-height: 1.4em !important;
                }
                .av-item .av-about .info .state {
                    margin-left: auto !important;
                }
                .av-item .av-about .info .state .looked {
                    font-size: 14px !important;
                    margin-right: unset !important;
                }
                .info.clearfix {
                    margin-top: auto !important;
                    display: flex !important;
                    flex-direction: initial !important;
                    align-items: center !important;
                }
                .info.clearfix .user {
                    display: flex !important;
                    align-items: center !important;
                }
                .info.clearfix .user span:last-child {
                    margin: 0 0 0 6px !important;
                    font-size: 14px !important;
                    float: unset !important;
                }
            `,
        }),
    ]
    watchlaterGroupList.push(new Group('watchlater-basic', '搜索页 基本功能', basicItems))
}

export { watchlaterGroupList }
