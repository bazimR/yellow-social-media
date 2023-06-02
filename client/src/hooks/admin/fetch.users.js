import axios from "axios";
import { useEffect, useState } from "react";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN

export default function useFetchUsers(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null })
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (query) {
                    setData(prev => ({ ...prev, isLoading: true }))
                    const { data, status } = await axios.get(`${query}`)

                    if (status === 201) {
                        setData(prev => ({ ...prev, isLoading: false }))
                        setData(prev => ({ ...prev, apiData: data, status: status }))
                    }
                    else {
                        setData(prev => ({ ...prev, isLoading: false }))
                    }
                }
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        }
        fetchData()
    }, [query])

    return [getData, setData]
}