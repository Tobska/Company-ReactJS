import React, { useState } from 'react';
import apollo from '../../helpers/ApolloInstance'
import { gql } from "apollo-boost";
import styles from './style.module.css'

export default function Index() {
	const [companies, setCompanies] = useState([])

	apollo
		.query({
			query: gql`
        {
          companies {
            name
          }
        }
      `
		})
		.then(res => {
			const { data: { companies } } = res
			setCompanies(companies)
		})

	const mapCompanyData = companies => {
		return companies.map(company => {
			return <div key={company.id + company.name} className={styles.item}>
				<div className={styles.details}>
					{company.name}
				</div>
				<div className={styles.btnGroup}>
					<button className="btn default">View Members</button>
					<button className="btn primary">Edit</button>
					<button className="btn danger">Delete</button>
				</div>
			</div>
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Your Companies</h2>
				<button className="btn primary">+ Create New Company</button>
			</div>

			<hr className="line" />

			<div className={styles.listContainer}>
				{mapCompanyData(companies)}
			</div>

		</div>
	);

}