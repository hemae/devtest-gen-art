export type AuthData = {
    username: string
    password: string
}

export type AuthPayload = {
    code: string
    data: {data: AuthData}
}
