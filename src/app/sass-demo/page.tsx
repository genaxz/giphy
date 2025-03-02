import React from 'react';
import styles from './style.module.scss';
export default function Home() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2>Sass Preprocessor Features</h2>
      </div>

      <div className={styles.cardBody}>
        <p>
          This card demonstrates nesting, variables, and other Sass features.
        </p>
        <p>The buttons below use the same mixin with different parameters.</p>
      </div>

      <div className={styles.cardFooter}>
        <button className={styles.primaryButton}>Primary</button>
        <button className={styles.secondaryButton}>Secondary</button>
        <button className={styles.outlineButton}>Outline</button>
      </div>
    </div>
  );
}
