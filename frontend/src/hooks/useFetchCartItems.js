import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchCartItems({ url }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: No token found");
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: token,
                        "ngrok-skip-browser-warning": true,
                    },
                });

                if (response.data.success) {
                    setData(response.data.data);
                } else {
                    throw new Error("Failed to fetch cart items");
                }
            } catch (err) {
                console.error("USEFETCH error:", err);
                setError(err.message || "Unexpected error occurred");
            }
        }

        fetchData();
    }, [url]);

    return { data, error };
}
