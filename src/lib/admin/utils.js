export const api = import.meta.env.VITE_API

export const defaultErrMsg = "Check Network log"

export const getToken = () => localStorage.getItem('token')

export async function createRequest({
    route,
    method,
    token,
    body
}) {
    const metaData = {
        method
    }

    if(body) {
        metaData.body = JSON.stringify(body)
    }

    if(token) {
        metaData.headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }else {
        metaData.headers = {
            "Content-Type": "application/json"
        }
    }

    return await fetch(`${api}/${route}`, metaData)
}