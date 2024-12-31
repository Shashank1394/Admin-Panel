"use client";

import { useEffect, useState } from "react";
import Layout from "./layout";
import styles from "./admin/admin.module.css";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Track mounting status
  const LOADING_TIMEOUT = 2000; // Total loading duration in ms
  const UPDATE_INTERVAL = 100; // Interval to update progress in ms

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the component has mounted

    let startTime;
    const increment = 100 / (LOADING_TIMEOUT / UPDATE_INTERVAL);

    const animateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / LOADING_TIMEOUT) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setLoading(false);
      }
    };

    startTime = Date.now();
    requestAnimationFrame(animateProgress);

    return () => {
      // Cleanup any side effects
    };
  }, []);

  // Don't render the loading part until the component is mounted
  if (!isMounted) {
    return null; // Render nothing initially to prevent hydration issues
  }

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
