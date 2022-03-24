import { useEffect } from 'react';
import useCallApi from '../../hooks/useCallApi';
import ItemsOnList from '../ItemsOnList';
import Spinner from '../Spinner';
import styles from './Main.module.css';

const Main = () => {

    const { data, loading, startLoading, getAllData } = useCallApi();

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

    const isLoading = (loading) ? <Spinner /> : null;

    return (
        <div className={styles.outsideContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.containerHeader}>
                    <h1>Fake Bored Ape Yacht Club</h1>
                    <h3> An Endless Scrolling NFT </h3>
                </div>
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