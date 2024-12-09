export const debounce = (callback, timeout = 500) => {
  let id = null;
  return (...args) => {
      clearTimeout(id);
      id = setTimeout(() => {
          callback.apply(this, args);
      }, timeout);
  };
};

export const getProfile = async (token) => {
  const response = await fetch(`${process.env.SERVER_API}/auth/profile`, {
      headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
      },
  });
  if(!response.ok) {
      return false;
  }
  return response.json();
};