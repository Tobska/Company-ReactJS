import React from 'react'
import styles from './style.module.css'

export default function index({ message, subMessage, visible }) {
  if (visible) {
    return (
      <div className={styles.popupContainer}>
        <div className={styles.mainMessage}>{message}</div>
        <div className={styles.subMessage}>{subMessage}</div>
      </div>
    )
  } else {
    return null
  }
}
