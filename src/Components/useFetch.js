import React, { useEffect, useState } from "react";

function useFetch(URL) {
  let [products, setProducts] = useState([]);
  let [err, setErr] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await fetch(URL);
        if (response.ok) {
          let data = await response.json();
          setProducts(data);
        } else {
          throw new Error("Search proper data");
        }
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { products, err, isLoading, setProducts };
}

export default useFetch;
