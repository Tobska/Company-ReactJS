import React from 'react'
import {
  Link
} from 'react-router-dom'
import styles from './style.module.css'

export default function index({ employee }) {
  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{employee.last_name + ', ' + employee.first_name}</div>
        <div className={styles.position}>{employee.position}</div>
      </div>
      <div className={styles.btnGroup}>
        <button className="btn default">Modify</button>
      </div>
    </div>
  )
}
