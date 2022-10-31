import {UniqueId} from '@apiModels/common'

export type AlertType = 'error' | 'notice'

export type Alert = {
    id?: UniqueId
    type?: AlertType
    message?: string
}
