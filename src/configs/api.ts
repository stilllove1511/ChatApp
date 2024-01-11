import { http } from "@utilities/http";
import { httpAuth } from "@utilities/httpAuth";
import STORAGES_CONFIG from "@configs/storage";
import axios from "axios";
import { ENDPOINT_API } from '@utilities/enums';

export const BearerToken = () => {
  return `Bearer ${localStorage.getItem(STORAGES_CONFIG.token)}`;
};

const API = {
  login: (data: any) => http.post(ENDPOINT_API.login, data)
};

export default API;
