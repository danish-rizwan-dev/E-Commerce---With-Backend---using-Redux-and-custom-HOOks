import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch({ url, category }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            await axios.get(url, {
                params: { category }
            })
                .then((res) => {
                    console.log(data);
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log("USEFETCH error:", err);
                    setError(err);
                });
        }
        fetchData();
    }, [url, category]);
    return { data, error };
}