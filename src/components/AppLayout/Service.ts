import { getErr422 } from "@utilities/helper";
import { AppDispatch } from "@redux/store";
import API from "@configs/api";
import { clearAdminAvatar } from "@redux/slice/SingleAdminSlice";
import { clearStateImage } from "@redux/slice/UpdateAdminSlice";
import { loginError } from "@redux/slice/LoginSlice";
import { logout } from "@redux/slice/AuthSlice";
import { HTTP_STATUS_CODE } from "@ts/enums";

export const LogoutService = {
  run: (dispatch: AppDispatch, params: any, onLogout: () => void) => {
    API.logout()
      .then((response: any) => {
        if (
          !response.data.data.length &&
          response.data.code === HTTP_STATUS_CODE.OK
        ) {
          dispatch(logout());
          dispatch(clearAdminAvatar());
          dispatch(clearStateImage());
          onLogout();
          localStorage.clear();
        } else if (
          response?.data?.error?.code === HTTP_STATUS_CODE.UNAUTHORIZED
        ) {
          dispatch(loginError(getErr422(response?.data?.error?.message)));
        }
      })
      .catch((error: any) => {
        dispatch(loginError(getErr422(error)));
      });
  },
};
