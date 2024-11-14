import React from 'react';
import styles from './loader.module.css';

const Loader: React.FC = () => (
  <div className={styles.container}>
    <div data-test-id="loader" className={styles.loader}>
    </div>
  </div>
);

export default Loader;