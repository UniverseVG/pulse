import { apiUrl } from "./config";

export const apiCall = async (url: string, options: any, queryParams?: any) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const apiUrlWithParams = queryParams
      ? `${apiUrl}/${url}?${queryString}`
      : `${apiUrl}/${url}`;

    const requestOptions = {
      method: options?.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options?.payload),
    };

    const response = await fetch(apiUrlWithParams, requestOptions);

    if (!response.ok) {
      throw new Error("Failed please try again later");
    }

    try {
      const data = await response.json();
      if (data) {
        return data;
      }
    } catch (error) {
      return response;
    }
  } catch (error) {
    console.error("Error occurred while getting time log:", error);
    throw error;
  }
};

export const addTask = async (payload: any) => {
  return apiCall("task", { method: "POST", payload });
};

// export const getTaskByUser = async (userId: string) => {
//   return apiCall(`${userId}/task`, { method: "GET" });
// };

export const getAllTask = async (queryParams: any) => {
  if (queryParams) {
    return apiCall("task", { method: "GET" }, queryParams);
  } else return apiCall("task", { method: "GET" });
};

export const updateTask = async (payload: any) => {
  return apiCall(`task/bulk-update`, { method: "PUT", payload });
};

export const deleteTask = async (taskId: any) => {
  return apiCall(`task/${taskId}`, { method: "DELETE" });
};

export const getTaskById = async (taskId: any) => {
  return apiCall(`task/${taskId}`, { method: "GET" });
};

export const getProjects = async (queryParams: any) => {
  return apiCall("project", { method: "GET" }, queryParams);
};

export const getProjectByUserId = async (queryParams: any) => {
  return apiCall("project", { method: "GET" }, queryParams);
};

export const getUserRole = async (queryParams: any) => {
  return apiCall("projectMapping", { method: "GET" }, queryParams);
};

export const getTaskForApproval = async () => {
  return apiCall("task/submission", { method: "GET" });
};

export const addUser = async (payload: any) => {
  return apiCall("user", { method: "POST", payload });
};

export const addProject = async (payload: any) => {
  return apiCall("project", { method: "POST", payload });
};

export const getUsers = async () => {
  return apiCall("user", { method: "GET" });
};

export const addUserToProject = async (payload: any) => {
  return apiCall("projectMapping", { method: "POST", payload });
};
