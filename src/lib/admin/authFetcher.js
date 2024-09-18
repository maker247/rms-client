import { 
    getToken,
    createRequest,
    defaultErrMsg
} from "./utils"

export const LOGIN = 'login'

export const AUTHENTICATE = 'authenticate'

export async function login(email, password) {
    const body = {
        email,
        password
    }

    const metaData = {
        route: LOGIN,
        method: 'POST',
        body
    }

    const res = await createRequest(metaData)

    if(res.ok) return res.json()
    
    throw new Error(defaultErrMsg)
}

export async function logout() {
    localStorage.removeItem('token')

    return true
}

export async function authenticate() {
    const token = getToken()

    if(token) {
        const res = await createRequest({
            route: AUTHENTICATE,
            method: 'POST',
            token
        })
    
        if(res.ok) return res.json()
    }

    return false
}