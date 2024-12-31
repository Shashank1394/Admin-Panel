"use client";

import { useEffect, useState } from "react";
import Layout from "./layout";
import styles from "./admin/admin.module.css";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const LOADING_TIMEOUT = 2000; // Total loading duration in ms
  const UPDATE_INTERVAL = 100; // Interval to update progress in ms

  useEffect(() => {
    const increment = 100 / (LOADING_TIMEOUT / UPDATE_INTERVAL);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, UPDATE_INTERVAL);

    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADING_TIMEOUT);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>Loading... {Math.round(progress)}%</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <nav className={styles.navBar}>
        <h1 className={styles.navTitle}>Status365 Admin Panel</h1>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <button onClick={() => alert("Manage Users")}>Manage Users</button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => alert("Manage Content")}>Manage Content</button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => alert("Analytics")}>Analytics</button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => alert("Settings")}>Settings</button>
          </li>
          <li className={styles.navItem}>
            <button onClick={() => alert("Logout")}>Logout</button>
          </li>
        </ul>
      </nav>
      <main className={styles.mainContent}>
        <h2>Welcome, Admin!</h2>
        <p>Select a module to get started managing the app.</p>
      </main>
    </Layout>
  );
}
