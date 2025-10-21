import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function LinkContainer() {
  const [favLinks, setFavLinks] = useState([]);

  const handleRemove = (index) => {
    setFavLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (favLink) => {
    // favLink should be { name, URL }
    if (!favLink?.name?.trim() || !favLink?.URL?.trim()) return;
    setFavLinks((prev) => [...prev, favLink]);
  };

  return (
    <div>
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and URL to the table!</p>

      <Table linkData={favLinks} removeLink={handleRemove} />

      <h1>Add New</h1>
      <Form submitNewLink={handleSubmit} />
    </div>
  );
}

export default LinkContainer;
