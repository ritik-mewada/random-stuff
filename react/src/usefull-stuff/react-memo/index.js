import React, { useState, useCallback } from "react";
import Button from "./Button";
import DemoOutput from "./DemoOutput";

const Index = () => {
	const [showParagraph, setShowParagraph] = useState(false);
	const [allowToggle, setAllowToggle] = useState(false);

	console.log("App is Running");

	const toggleParagraphHandler = useCallback(() => {
		if (allowToggle) {
			setShowParagraph((prevShowParagraph) => !prevShowParagraph);
		}
	}, [allowToggle]);

	const allowToggleHandler = () => {
		setAllowToggle(true);
	};

	return (
		<div>
			<h1>Hi there!</h1>
			<DemoOutput show={showParagraph} />
			<Button onClick={allowToggleHandler}>Allow Paragraph</Button>
			<Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
		</div>
	);
};

export default Index;
