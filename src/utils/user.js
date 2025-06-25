import { BASE_URL_BACKEND } from "./constants";
import { checkResponse } from "./response";

export const updateUserProfile = (params) => {
  const { token, name, avatar } = params;

  return fetch(`${BASE_URL_BACKEND}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
};
