import React from "react";
import { Colors, Button, Navbar, Alignment } from "@blueprintjs/core";

const Topbar = ({ theme, setTheme }) => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Ten Hands</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {theme === "bp3-dark" ? (
          <Button icon="flash" onClick={() => setTheme("bp3-light")} minimal />
        ) : (
          <Button icon="moon" onClick={() => setTheme("bp3-dark")} minimal />
        )}
      </Navbar.Group>
    </Navbar>
  );
};

export default Topbar;
