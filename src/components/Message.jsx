import styles from "./Message.module.css";

function Message({ message }) {
  return <p className={styles.message}>{message}</p>;
}

export default Message;
