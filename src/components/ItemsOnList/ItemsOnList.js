import React from 'react';
import styles from './ItemsOnList.module.css';


const ItemsOnList = ({ name, image_url, token_id }) => {
    return (
        <div key={token_id} className={styles.itemContainer}>

            <div className={styles.nameContainer}>
                <span>Name: {name}</span>
                <span>ID: {token_id}</span>
            </div>
            <img src={image_url} alt=' of Item' />

        </div>
    );
}

export default ItemsOnList;