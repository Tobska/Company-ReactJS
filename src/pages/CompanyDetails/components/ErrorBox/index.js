import React from 'react'
import styles from './style.module.css'

export default function Index({ errorString }) {
  return (
    <div className={styles.error}>{errorString}</div>
  )
}
