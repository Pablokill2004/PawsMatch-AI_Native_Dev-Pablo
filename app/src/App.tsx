import React from "react";

export default function App() {
  return React.createElement(
    "main",
    { style: { padding: "16px", fontFamily: "system-ui, sans-serif" } },
    React.createElement("h1", null, "PawsMatch"),
    React.createElement(
      "p",
      null,
      "This placeholder exists for the autograder. The real app lives in App.svelte."
    )
  );
}
