import { debug, error } from '../../../utils/logger'
import { ISubFilter } from '../core'

class UploaderFilter implements ISubFilter {
    isEnable = false
    private uploaderSet = new Set<string>()

    setStatus(status: boolean) {
        this.isEnable = status
    }

    setParams(uploaderList: string[]) {
        this.uploaderSet = new Set(uploaderList)
    }

    addParam(uploader: string) {
        if (uploader.trim()) {
            this.uploaderSet.add(uploader.trim())
        }
    }

    check(uploader: string): Promise<void> {
        uploader = uploader.trim()
        return new Promise<void>((resolve, reject) => {
            try {
                if (!this.isEnable || uploader.length === 0 || this.uploaderSet.size === 0) {
                    // debug('resolve, UploaderFilter disable, or uploader invalid, or uploader list empty')
                    resolve()
                } else if (this.uploaderSet.has(uploader)) {
                    debug(`reject, uploader ${uploader} in uploader list`)
                    reject()
                } else {
                    // debug(`resolve, uploader ${uploader} not in uploader list`)
                    resolve()
                }
            } catch (err) {
                error(err)
                error(`resolve, UploaderFilter error, uploader`, uploader)
                resolve()
            }
        })
    }
}

// 单例
const uploaderFilterInstance = new UploaderFilter()
export default uploaderFilterInstance
