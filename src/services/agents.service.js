import Swal from "sweetalert2";
import Axios from "../plugins/axios";
import { toast } from "react-toastify";
class Agents {
  async getAllAgents() {
    try {
      const response = await Axios.get(`/admin/agents`);
      // console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneAgent(agentId) {
    try {
      const response = await Axios.get(`/admin/agents/${agentId}`);
      // console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async suspendAgentToggle(agentId) {
    const payload = { agent_id: agentId };
    try {
      const response = await Axios.post(`/admin/toggle-agent-status`, payload);
      console.log(response);
      toast.success(response?.msg || "Operation completed successfully");
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Operation Failed");
      throw new Error(error);
    }
  }
  async getAllSupportTickets() {
    try {
      const response = await Axios.get(`/admin/support-tickets`);
      // console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async verifyAgent(payload) {
    try {
      const response = await Axios.post(`/admin/verify-agent`, payload);
      // console.log(response)
      toast.success(`${response?.data}` || "Agent Verified");
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
        errorMessage = "Network error: Please check your internet connection.";
      }
      //toast.error(`${errorMessage}` || "Agent Verified");
      throw new Error(error);
    }
  }
}
export const AgentService = new Agents();
