import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:8001";

  static async login(email, password) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/signin`,
        { email, password }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async register(userData, token) {
    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/auth/signup`,
        userData
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async fetchTasks() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${UserService.BASE_URL}/api/adminuser/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

  static async handleAddTask(newTask) {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await axios.post(
        `${UserService.BASE_URL}/api/adminuser/tasks`,
        newTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async handleUpdateTask(taskId, updatedTask, token) {
    try {
      const response = await axios.put(`${UserService.BASE_URL}/api/adminuser/tasks/${taskId}`, updatedTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data; // Return data from the response
    } catch (error) {
      throw error; // Throw error to be handled by the caller
    }
  }

  static async handleDeleteTask(taskId, token) {
    try {
      const response = await axios.delete(`${UserService.BASE_URL}/api/adminuser/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return true; // Return true to indicate successful deletion
      } else {
        return false; // Return false on failure
      }
    } catch (error) {
      throw error; // Throw error to be handled by the caller
    }
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload(); // Reload the app upon successful logout
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

}

export default UserService;