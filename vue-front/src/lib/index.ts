import Swal from "sweetalert2";

type NotificationVariant = "success" | "warning" | "error";

export function Notification(message: string, type: NotificationVariant = "success", duration = 2500) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const options = {
    text: message,
    toast: true,
    position: "top-end" as const,
    timer: duration,
    timerProgressBar: true,
    showConfirmButton: false
  };

  return Swal.fire({ ...options, icon: type });
}
