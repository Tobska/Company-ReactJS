import React, { useState } from 'react'
import styles from './style.module.css'

export default function Index({ message, subMessage, visible, confirmFunc, cancelFunc }) {
  const clickOutside = () => {
    cancelFunc()
  }

  const confirmAction = (e) => {
    e.stopPropagation()
    confirmFunc()
  }

  const cancelAction = (e) => {
    e.stopPropagation()
    cancelFunc()
  }

  if (visible) {
    return (
      <div className={styles.popupContainer} onClick={clickOutside}>
        <div className={styles.mainMessage}>{message}</div>
        <div className={styles.subMessage}>{subMessage}</div>
        <div className={styles.confirmBtnContainer}>
          <button onClick={confirmAction} className="btn primary">Confirm</button>
          <button onClick={cancelAction} className="btn default">Cancel</button>
        </div>
      </div>
    )
  } else {
    return null
  }
}
