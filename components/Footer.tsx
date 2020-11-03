import React from 'react'

export default function Footer() {
	return (
		<React.Fragment>
			<div className="dRowCenter footer">
				<img src="/images/logo-footer.png" alt="." />
			</div>
			<style jsx global>{`
				.footer {
					background: #3A4145;
					padding: 4vh 0;
				}
				.footer img{
					width: auto;
			    max-height: 70px;
			    max-width: 90%;
			    height: auto;
				}
			`}</style>
		</React.Fragment>
	)
}