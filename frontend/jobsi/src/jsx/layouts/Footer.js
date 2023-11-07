import React from "react";

const Footer = () => {
	var d = new Date();
	return (
		<div className="footer out-footer">
			<div className="copyright">
				<p>
					{" "}Developed by{" "}
					<a href="http://aspector.cz/" target="_blank"  rel="noreferrer">
						Aspector
					</a>{" "}
					{d.getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default Footer;
