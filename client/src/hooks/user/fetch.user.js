import { userProfile } from "../../helper/helper";
import { useEffect, useState } from "react";


export const useSavedQuery = (userId) => {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null })
    useEffect(() => {
        const fetchData = async () => {
            try {

                setData(prev => ({ ...prev, isLoading: true }))
                const { data, status } = await userProfile(userId)

                if (status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }))
                    setData(prev => ({ ...prev, apiData: data, status: status }))
                }
                else {
                    setData(prev => ({ ...prev, isLoading: false }))
                }

            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        }
        fetchData()
    }, [userId])

    return [getData, setData]

};
