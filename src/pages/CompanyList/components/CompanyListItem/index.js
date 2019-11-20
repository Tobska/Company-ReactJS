import React from 'react'
import {
  Link
} from 'react-router-dom'
import styles from './style.module.css'

export default function index({ company }) {
  return (
    <div className={styles.item}>
      <div className={styles.details}>
        <div className={styles.name}>{company.name}</div>
        <div className={styles.address}>{company.address}</div>
        <div className={styles.desc}>{company.description}</div>
      </div>
      <div className={styles.btnGroup}>
        <Link to={`/employees/${company.id}`}><button className="btn primary">View Employees</button></Link>
        <Link to={`/company/${company.id}`}><button className="btn default">Modify</button></Link>
      </div>
    </div>
  )
}
