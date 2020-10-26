import React from 'react'
import {Row, Col} from "antd";
import { useTheme } from "../shared-components/Styles/ThemeHook";
import { useTranslation } from "react-i18next";

export default function Sponsor() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	return (
		<React.Fragment>
			<Row className="TalksLanding">
				<Col xs={24} className="containerLanding">
					<h1>Sponsor</h1>
				</Col>
			</Row>
		</React.Fragment>
	)
}