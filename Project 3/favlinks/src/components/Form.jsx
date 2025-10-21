import React, { useState } from "react";

function Form({ submitNewLink }) {
  const [name, setName] = useState("");
  const [URL, setURL] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    submitNewLink?.({ name: name.trim(), URL: URL.trim() });
    setName("");
    setURL("");
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="linkName">Link Name:</label>
      <input
        type="text"
        id="linkName"
        name="linkName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., React Docs"
      />
      <br />
      <br />
      <label htmlFor="linkURL">Link URL:</label>
      <input
        type="text"
        id="linkURL"
        name="linkURL"
        value={URL}
        onChange={(e) => setURL(e.target.value)}
        placeholder="https://react.dev"
      />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
