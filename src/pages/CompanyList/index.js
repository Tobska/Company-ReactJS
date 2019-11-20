import React, { useEffect } from 'react';
import { gql } from "apollo-boost";
import styles from './style.module.css'
import {
	Link
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import CompanyListItem from './components/CompanyListItem'

export default function Index() {
	const COMPANIES = gql`
		{
			companies {
				id
				name
				address
				description
			}
		}
	`

	const { loading, data, refetch } = useQuery(COMPANIES)

	useEffect(() => {
		refetch()
	}, [])

	const mapCompanyData = companies => {
		return companies.map(company => {
			return <CompanyListItem company={company} />
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Your Companies</h2>
				<Link to="/company"><button className="btn primary">+ Create New Company</button></Link>
			</div>

			<hr className="line" />

			<div className={styles.listContainer}>
				{(loading || (data === undefined)) ? null : mapCompanyData(data.companies)}
			</div>

		</div>
	);

}