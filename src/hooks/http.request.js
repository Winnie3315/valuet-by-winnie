import axios from "axios"
import {
    useCallback,
    useState
} from "react"



export const useHttpRequest = (url) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (path, method = "get", body = null) => {
        try {
            setLoading(true)
            const res = await  axios[method](url + path, body)

            if (res.status !== 200 && res.status !== 201) {
                throw new Error(res.status)
            }
            
            setLoading(false)
            return res.data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            return null
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {
        loading,
        error,
        clearError,
        request
    }
}
