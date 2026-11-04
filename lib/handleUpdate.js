const handleUpdate = (url, data) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.result === "success") {
        return true;
      } else {
        return false;
      }
    });
};

export default handleUpdate;
