import Axios from "../plugins/axios";
class DashboardWidgets {
  async getDashboardWidget() {
    try {
      const response = await Axios.get(`/admin/dashboard`);
      // console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const DashboardWidgetsServices = new DashboardWidgets();
