import { format } from "date-fns";

export const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "MMM d, yyyy h:mm a");
  };