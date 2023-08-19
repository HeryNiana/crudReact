import axios from "axios";

export async function getList() {
  return await axios.get(
    `${process.env.REACT_APP_REST_API_LOCATION}/infos`
    );
}

export async function addUser(data) {
  const payload = {
    data: {
      ...data,
    },
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_REST_API_LOCATION}/infos`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(data, id) {
  const payload = {
    data: {
      ...data,
    },
  };

  try {
    const response = await axios.put(
      `${process.env.REACT_APP_REST_API_LOCATION}/infos/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  return await axios.delete(
    `${process.env.REACT_APP_REST_API_LOCATION}/infos/${id}`
  );
}

export async function getUserById(id) {
  return await axios.get(
    `${process.env.REACT_APP_REST_API_LOCATION}/infos/${id}`
  );
}
