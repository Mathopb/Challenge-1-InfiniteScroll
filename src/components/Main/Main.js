import React, { useEffect, useState, useRef } from 'react';
import axios from '../../config/Axios';
import ItemsOnList from '../ItemsOnList';
import Spinner from '../Spinner';
import styles from './Main.module.css';

const Main = () => {

    const offsetRef = useRef(0);
    const dataRef = useRef(0)
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemLimit, setItemLimit] = useState(20);

    useEffect(() => {
        offsetRef.current = offset;
    }, [offset])

    useEffect(() => {
        dataRef.current = data;
    }, [data])

    useEffect(() => {

        const getAllData = async () => {

            const result = await axios.get(`assets?asset_contract_address=0x7470ea065e50e3862cd9b8fb7c77712165da80e5&order_direction=desc&offset=${offsetRef.current}&limit=${itemLimit}`);

            setOffset(offsetRef.current + 20);

            const oldData = dataRef.current;
            const newData = oldData.concat(result.data.assets);

            setData(newData);
            setLoading(false);

            console.log(newData);
            console.log(itemLimit);

        }

        window.addEventListener('scroll', function (e) {

            const { scrollHeight, clientHeight, scrollTop } = this.document.documentElement;

            if (clientHeight + scrollTop === scrollHeight) {
                setLoading(true);
                getAllData();
            }
        });

        getAllData();

    }, [])

    const isLoading = (loading) ? <Spinner /> : null;

    const selectLimit20 = () => {
        setItemLimit(20);
        setData([]);
    }

    const selectLimit50 = () => {
        setItemLimit(50);
        setData([])
    }

    return (
        <div className={styles.outsideContainer}>
            <div className={styles.mainContainer}>
                {/* <div className={styles.dropdown}>
                    <button className={styles.dropbtn}>Dropdown</button>
                    <div className={styles.dropdownContent}>
                        <button onClick={selectLimit20}>20 Items per Page</button>
                        <button onClick={selectLimit50}>50 Items per Page</button>
                    </div>
                </div> */}
                <div className={styles.dataContainer}>
                    {
                        data.map(({ name, image_url, token_id }) =>
                            <ItemsOnList
                                key={token_id}
                                name={name}
                                image_url={image_url}
                                token_id={token_id}
                            />
                        )
                    }
                </div>
                {isLoading}
            </div>
        </div>
    );
}

export default Main;