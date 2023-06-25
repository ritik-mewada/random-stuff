import React from "react";
import ParagraphRunning from "./ParagraphRunning";

const DemoOutput = (props) => {
	console.log("Demo Output running");
	return (
		<ParagraphRunning>
			{props.show ? "This is Paragraph" : ""}
		</ParagraphRunning>
	);
};

export default React.memo(DemoOutput);
