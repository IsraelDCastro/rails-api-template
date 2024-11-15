import Swal from "sweetalert2";

const Notification = (message, type, duration = 2500) => {
  if (typeof document !== "undefined") {
    const options = {
      text: message,
      toast: true,
      position: "top-end",
      timer: duration,
      timerProgressBar: true,
      showConfirmButton: false,
    };

    if (type === "success") {
      return Swal.fire({ ...options, icon: "success" });
    }

    if (type === "warning") {
      return Swal.fire({ ...options, icon: "warning" });
    }

    return Swal.fire({ ...options, icon: "error" });
  }
};
export { Notification };
