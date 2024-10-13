import { hostname } from "@/main";
import axios from "axios";

/** send a command to the homecontrol unit */
export function command<CommandTypeResult>(command_data: object) {
  return axios.post<CommandTypeResult>(hostname + "/command", command_data);
}
