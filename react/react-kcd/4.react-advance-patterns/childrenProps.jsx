import * as React from "react";
import { Switch } from "../switch";

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // By this way you can simply pass the props to child component without manually passing it in parent component
  return React.Children.map(children, (child) => {
    // You can also check like this if child is function or not
    if (typeof child.type === "string") {
      return child;
    }
    // another way it to make variable of allowedType
    if (allowedType.includes(child.type)) {
      const newChild = React.cloneElement(child, { on, toggle });
      return newChild;
    }
    return child;
  });
}

const ToggleOn = ({ on, children }) => (on ? children : null);
const ToggleOff = ({ on, children }) => (on ? null : children);
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;

const allowedType = [ToggleOn, ToggleOff, ToggleButton];

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
