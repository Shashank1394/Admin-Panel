// app/admin/index.js
import Layout from '../layout';
import styles from './admin.module.css';

export default function AdminPanel() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Admin Panel</h1>
        <p>Welcome to the admin panel!</p>
      </div>
    </Layout>
  );
}
