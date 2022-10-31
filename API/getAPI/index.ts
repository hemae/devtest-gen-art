import entityAPI from '@entityAPI'
import basePaths, {BasePathsKeys} from '@basePaths'


export default function getAPI<Entity>(entity: BasePathsKeys, token?: string | null) {
    return entityAPI<Entity>({
        //@ts-ignore
        baseURL: (!!token || token === null) && process.env.BACKEND_API,
        basePath: basePaths[entity]
    })
}
