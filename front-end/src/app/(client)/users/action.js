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


export const handleUpdateUser = async (formData) => {
  // Extract the `id` from the FormData
  const { id } = Object.fromEntries(formData); // Convert FormData to an object and extract `id`

  // Make the fetch request
  const response = await fetch(`${process.env.SERVER_API}/users/${id}?_method=PUT`, {
    method: "POST", // Simulating PUT request
    body: formData, // Pass the FormData directly
  });

  // Parse the JSON response
  const responseBody = await response.json();

  // Return success status
  if (responseBody.success) {
    return true;
  }
  return false;
};
