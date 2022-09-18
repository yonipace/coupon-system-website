import axios from "axios";

class InterceptorsService {
  public createInterceptors(): void {
    axios.interceptors.request.use((request) => {
      if (localStorage.getItem("token")) {
        request.headers = {
          token: localStorage.getItem("token"),
        };
      }
      // request.headers = { "Content-Type": "application/json" };
      return request; // must return the changed request object
    });
  }
}

const interceptorsService = new InterceptorsService();
export default interceptorsService;
