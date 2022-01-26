import React from 'react';
import styles from './Spinner.module.css'

const Spinner = () => {
    return (
        <div class={styles.spinner}>
            <div class={styles.rect1}></div>
            <div class={styles.rect2}></div>
            <div class={styles.rect3}></div>
            <div class={styles.rect4}></div>
            <div class={styles.rect5}></div>
        </div>);
}

export default Spinner;