import styles from "./Logo.module.css";

function Logo() {
  return (
    <img src="/logo.png" alt="TravelTracker logo" className={styles.logo} />
  );
}

export default Logo;
