import {
    createRequest,
    getToken,
    defaultErrMsg
} from "../../lib/admin/utils"

export const GET_USERS = 'users'

export async function getUsers() {
    const metaData = {
        route: GET_USERS,
        token: getToken(),
        method: 'GET'
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()
    
    throw new Error(defaultErrMsg)
}

export async function getUser(uuid) {
    const metaData = {
        route: `${GET_USERS}/${uuid}`,
        token: getToken(),
        method: 'GET'
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function storeUser(data) {
    const token = getToken()

    const metaData = {
        route: `${GET_USERS}`,
        method: 'POST',
        token: token,
        body: data
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function updateUser(uuid, data) {
    const token = getToken()

    const metaData = {
        route: `${GET_USERS}/${uuid}`,
        method: 'PUT',
        token: token,
        body: data
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function deleteUser(uuid) {
    const token = getToken()

    const metaData = {
        route: `${GET_USERS}/${uuid}`,
        method: 'DELETE',
        token: token
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}