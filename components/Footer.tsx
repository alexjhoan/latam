import React from 'react'

export default function Footer() {
	return (
		<React.Fragment>
			<div className="dRowCenter footer">
				<img src="/images/latam.png" alt="." />
			</div>
			<style jsx global>{`
				.footer {
					background: #3A4145;
					paddin: 4vh 0;
				}
				.footer img{
					width: auto;
					height: 70px;
				}
			`}</style>
		</React.Fragment>
	)
}