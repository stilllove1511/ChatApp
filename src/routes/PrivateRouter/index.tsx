import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "@redux/store";
import AppLayout from "@components/AppLayout";

interface Props {
  children?: React.ReactNode;
  path?: string;
  exact?: boolean;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const isLogin = auth.token && auth.user;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          <AppLayout>{children}</AppLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
