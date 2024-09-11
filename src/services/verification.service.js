import Axios from "../plugins/axios";
class Verification {
  async getAllVerifications() {
    try {
      const response = await Axios.get(`/admin/verification`);
      // console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneVerification(verificationId) {
    try {
      const response = await Axios.get(`/admin/verification/${verificationId}`);
      //   console.log(response)
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export const VerificationService = new Verification();
