import { useRef, useState, useEffect } from 'react';
import axios from '../config/Axios';

const useCallApi = () => {

    const offsetRef = useRef(0);
    const dataRef = useRef(0)
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        offsetRef.current = offset;
    }, [offset]);

    useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const getAllData = async () => {

        const result = await axios.get(`assets?asset_contract_address=0x7470ea065e50e3862cd9b8fb7c77712165da80e5&order_direction=desc&offset=${offsetRef.current}&limit=20`);

        setOffset(offsetRef.current + 20);

        const oldData = dataRef.current;
        const newData = oldData.concat(result.data.assets);

        setData(newData);
        setLoading(false);

        console.log(newData);

    }

    const startLoading = () => {
        setLoading(true);
    }

    return {
        data,
        loading,
        startLoading,
        getAllData
    };
}

export default useCallApi;