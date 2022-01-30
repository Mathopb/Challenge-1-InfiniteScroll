import React, { useEffect } from 'react';
import useCallApi from '../CustomHooks/useCallApi';
import ItemsOnList from '../ItemsOnList';
import Spinner from '../Spinner';
import styles from './Main.module.css';

const Main = () => {

    const {data, loading, startLoading, getAllData} = useCallApi();

    useEffect(() => {

        window.addEventListener('scroll', function (e) {

            const { scrollHeight, clientHeight, scrollTop } = this.document.documentElement;

            if (clientHeight + scrollTop === scrollHeight) {
                startLoading();
                getAllData();
            }
        });

        getAllData();

    }, []);

    console.log ('data', data);

    const isLoading = (loading) ? <Spinner /> : null;

    return (
        <div className={styles.outsideContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.dataContainer}>
                    {
                        data && data.map(({ name, image_url, token_id }) =>
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