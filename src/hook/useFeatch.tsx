import { useState, useEffect } from "react";
import { api } from "../api";

export const useFetch = <T = any>(endpoint: string, params: Record<string, any> = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean | null>(true);

    useEffect(() => {
        setLoading(true);
        api
            .get<T>(endpoint, { params })
            .then((res) => {
                setData(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.response?.data || err.message);
                setData(null);
            })

            .finally(() => setLoading(false));
    }, [endpoint, JSON.stringify(params)]);

    return { data, error, loading };
};
