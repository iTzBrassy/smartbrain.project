import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("Sign Out")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("SignIn")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("Register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
