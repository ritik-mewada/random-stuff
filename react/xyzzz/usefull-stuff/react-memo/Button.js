import React from "react";

const Button = (props) => {
	console.log("Button is Running");
	return (
		<button
			type={props.type || "button"}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default React.memo(Button);
