import { Notyf } from "notyf";

class NotificationService {
  // we use this object to display succes and failure messages
  private notify = new Notyf({
    duration: 10000,
    position: { x: "center", y: "top" },
  });

  public success(message: string): void {
    this.notify.success(message);
  }

  public error(err: any): void {
    this.notify.error(this.extractErrorMessage(err));
  }

  private extractErrorMessage(err: any) {
    // front throw "blah..."
    if (typeof err === "string") return err;

    // axios received  an error string from backend"
    if (typeof err.response?.data === "string") return err.response.data;

    // axios received  an error array from backend"
    if (Array.isArray(err.response?.data)) return err.response.data[0];

    // front throw "blah..."
    if (typeof err.message === "string") return err.message;

    console.dir(err); // if non of the above is right
    return "Some error occured, please try again";
  }
}

const notificationService = new NotificationService();
export default notificationService;
