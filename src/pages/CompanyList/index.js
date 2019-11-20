import React, { useEffect } from 'react';
import { COMPANIES } from '../../helpers/GraphQLConsts'
import styles from './style.module.css'
import {
	Link
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';

import CompanyListItem from './components/CompanyListItem'

export default function Index() {

	const { loading, data } = useQuery(COMPANIES)

	const mapCompanyData = companies => {
		if (companies.length > 0) {
			return companies.map(company => {
				return <CompanyListItem key={company.id + company.name} company={company} />
			})
		} else {
			return <div className={styles.messageText}>You have no companies.</div>
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Your Companies</h2>
				<Link to="/company"><button className="btn primary">+ Create New Company</button></Link>
			</div>

			<hr className="line" />

			<div className={styles.listContainer}>
				{loading ? <div className={styles.messageText}>Loading. Please wait...</div> : null}
				{(loading || (data === undefined)) ? null : mapCompanyData(data.companies)}
			</div>

		</div>
	);

}