import { toast } from "react-toastify";
import Axios from "../plugins/axios";
import Swal from "sweetalert2";

class Admin {
  async getAllAdmins() {
    try {
      const response = await Axios.get(`/admin/all`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createAdmin(payload) {
    try {
      const response = await Axios.post(`/admin/create`, payload);
      toast.success("Admin created successfully");
      return response;
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Server Error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage =
          "Network error (custom): Please check your internet connection.";
      }
      toast.error(`Error:  ${errorMessage}`);
      throw new Error(error);
    }
  }

  async suspendAdminToggle(adminId, isActive) {
    const payload = { admin_id: adminId };
    try {
      const response = await Axios.put(`/admin/suspend`, payload);
      console.log("response", response);
      toast.success(`${response?.msg}`);
      return response;
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = `Server Error: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage =
          "Network error (custom): Please check your internet connection.";
      }
      toast.error(`Error:  ${errorMessage}`);
      throw new Error(error);
    }
  }
}
export const AdminService = new Admin();
