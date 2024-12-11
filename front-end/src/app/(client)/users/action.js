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
  try {
    // Append `_method=PATCH` to the FormData
    formData.append("_method", "PATCH");

    // Make the API request
    const response = await fetch(`${process.env.SERVER_API}/users/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json", // Optional
      },
    });

    // Parse the JSON response
    const responseBody = await response.json();

    // Handle response
    if (response.ok && responseBody.success) {
      console.log("User updated successfully:", responseBody.data);
      return responseBody;
    } else {
      console.error("Error updating user:", responseBody);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
};