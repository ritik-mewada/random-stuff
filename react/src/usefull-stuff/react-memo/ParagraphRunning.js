import React from "react";

const ParagraphRunning = (props) => {
	console.log("MyParagraph Running");
	return <p>{props.children}</p>;
};

export default ParagraphRunning;
