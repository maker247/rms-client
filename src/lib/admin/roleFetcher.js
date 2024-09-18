import {
    createRequest,
    getToken,
    defaultErrMsg
} from "../../lib/admin/utils"

export const GET_ROLES = 'roles'

export async function getRoles() {
    const metaData = {
        route: GET_ROLES,
        token: getToken(),
        method: 'GET'
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()
    
    throw new Error(defaultErrMsg)
}

export async function getRole(uuid) {
    const metaData = {
        route: `${GET_ROLES}/${uuid}`,
        token: getToken(),
        method: 'GET'
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function storeRole(data) {
    const token = getToken()

    const metaData = {
        route: `${GET_ROLES}`,
        method: 'POST',
        token: token,
        body: data
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function updateRole(uuid, data) {
    const token = getToken()

    const metaData = {
        route: `${GET_ROLES}/${uuid}`,
        method: 'PUT',
        token: token,
        body: data
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}

export async function deleteRole(uuid) {
    const token = getToken()

    const metaData = {
        route: `${GET_ROLES}/${uuid}`,
        method: 'DELETE',
        token: token
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()

    throw new Error(defaultErrMsg)
}