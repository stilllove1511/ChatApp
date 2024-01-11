import axios from "axios";
import ENVIRONMENT_CONFIG from "@configs/env";

export const http = axios.create({
  baseURL: ENVIRONMENT_CONFIG.host,
  timeout: 180000,
});
