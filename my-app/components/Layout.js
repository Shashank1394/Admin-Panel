import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Status 365 Admin Panel</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}