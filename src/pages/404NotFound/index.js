import React from 'react'
import styles from './style.module.css'
import {
  Link
} from 'react-router-dom'

export default function index() {
  return (
    <div className={styles.notFoundContainer}>
      404 Not Found
      <Link to="/"><div className={styles.link}>Go Back to Homepage</div></Link>
    </div>
  )
}
