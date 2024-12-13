"use server";
export const handleCreateUser = async (formData) => {
  // Use the FormData object directly for sending files
  const response = await fetch(`${process.env.SERVER_API}/users`, {
    method: "POST",
    body: formData, // Directly pass the FormData object
  });

  // Parse the JSON response
  const responseBody = await response.json();

  if (responseBody.success) {
    return true;
  }
  return false;
};

export const handleUpdateUser = async (formData, id) => {
    formData.append("_method", "PATCH");
    const response = await fetch(`${process.env.SERVER_API}/users/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json", // Optional
      },
    });

  const responseBody = await response.json();

  if (responseBody.success) {
    return true;
  }
  return false;
};