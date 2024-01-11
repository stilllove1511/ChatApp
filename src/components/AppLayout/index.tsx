import { useEffect, useState } from "react";
import {
  PoweroffOutlined,
  UnlockOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { showConfirmationModal } from "@redux/slice/ConfirmationRedirectSlice";
import { RootState } from "@redux/store";
import UserAvatar from "@components/UserAvatar";
import { GetCurrentUserService } from "@components/GetCurrentUser/Service";
import { LogoutService } from "@components/AppLayout/Service";
import { AppLayoutProps } from "@ts/interfaces";
import STORAGES_CONFIG from "@configs/storage";
import IMAGES from "@assets/images";
import { ROUTE_PATH, RESOURCE_DEFAULT, PERMISSION_DEFAULT } from "@ts/enums";
import { useBeforeRender } from "@hooks/useBeforeRender";
import {
  TRANSACTION_PATH,
  Analysis_PATH,
  INVESTOR_PATH,
  Insight_PATH,
  NEWS_PATH,
  PERSON_PATH,
  VIDEO_PATH,
  PAYMENT_PATH,
  INDUSTRY_PATH,
  COUNTRY_PATH,
  REGION_PATH,
  COMPANY_PATH,
  USER_CMS_PATH,
  USER_LP_PATH,
  ROLE_LP_PATH,
  ROLE_CMS_PATH,
} from "@components/AppLayout/constant";
import { useBeAtTop } from "@hooks/useBeAtTop";
import { USER_MANUAL_GUIDE } from "@utilities/constants";

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const updateAdmin = useSelector((state: RootState) => state.updateAdmin);
  const auth = useSelector((state: RootState) => state.auth);
  const roles = auth.roles;
  const resource = roles.resources;

  const leftMenuList: MenuProps["items"] = [
    {
      key: ROUTE_PATH.dashboard,
      icon: <img src={IMAGES.dashboardIcon} alt="user" />,
      label: "Dashboard",
    },
  ];
  const [menuLeft, setMenuLeft] = useState<MenuProps["items"]>([
    {
      key: ROUTE_PATH.dashboard,
      icon: <img src={IMAGES.dashboardIcon} alt="dashboardIcon" />,
      label: "Dashboard",
    },
  ]);

  const checkArrayElements = (arr1: any, arr2: any) => {
    return arr1?.some((element: any) => arr2?.includes(element));
  };
  const pushSubMenu = (path: string, menu: any) => {
    return (
      leftMenuList
        ?.find((obj: any) => obj.key === path)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ?.children?.push(menu)
    );
  };
  const resourceKeys = resource?.map((element: any) => {
    return element?.resourceKey;
  });
  const userManagementResourceArrayKeys = [
    RESOURCE_DEFAULT.USER_CMS_MANAGEMENT.key,
    RESOURCE_DEFAULT.USER_LP_MANAGEMENT.key,
  ];
  const roleManagementResourceArrayKeys = [
    RESOURCE_DEFAULT.CMS_ROLE.key,
    RESOURCE_DEFAULT.LP_ROLE.key,
  ];
  const companyResourceArrayKeys = [
    RESOURCE_DEFAULT.COMPANY.key,
    RESOURCE_DEFAULT.INDUSTRY.key,
    RESOURCE_DEFAULT.REGION.key,
    RESOURCE_DEFAULT.COUNTRY.key,
  ];
  if (checkArrayElements(resourceKeys, userManagementResourceArrayKeys)) {
    leftMenuList?.push({
      key: ROUTE_PATH.users,
      icon: <img src={IMAGES.userManagerIcon} alt="userManagerIcon" />,
      label: "Users Management",
      children: [],
    });
  }
  if (checkArrayElements(resourceKeys, roleManagementResourceArrayKeys)) {
    leftMenuList?.push({
      key: ROUTE_PATH.roles,
      icon: <img src={IMAGES.roleManagerIcon} alt="roleManagerIcon" />,
      label: "Roles Management",
      children: [],
    });
  }
  if (checkArrayElements(resourceKeys, companyResourceArrayKeys)) {
    leftMenuList?.push({
      key: ROUTE_PATH.company,
      icon: <img src={IMAGES.companyIcon} alt="companyIcon" />,
      label: "Company",
      children: [],
    });
  }
  if (resource) {
    resource.forEach(
      (resource: {
        resourceId: number;
        resourceName: string;
        resourceKey: string;
        permissions: any;
      }) => {
        if (resource.resourceKey === RESOURCE_DEFAULT.USER_CMS_MANAGEMENT.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.users, USER_CMS_PATH);
              }
            },
          );
        } else if (
          resource.resourceKey === RESOURCE_DEFAULT.USER_LP_MANAGEMENT.key
        ) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.users, USER_LP_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.CMS_ROLE.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.roles, ROLE_CMS_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.LP_ROLE.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.roles, ROLE_LP_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.COMPANY.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.company, COMPANY_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.INDUSTRY.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.company, INDUSTRY_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.COUNTRY.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.company, COUNTRY_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.REGION.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                pushSubMenu(ROUTE_PATH.company, REGION_PATH);
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.PERSON.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.person) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(PERSON_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.ACQUISITION.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.transaction) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(TRANSACTION_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.NEWS.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.news) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(NEWS_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.INVESTOR.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.investor) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(INVESTOR_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.INSIGHT.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.insight) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(Insight_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.ANALYSIS.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.analysis) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(Analysis_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.VIDEO.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.videoDistribution) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(VIDEO_PATH);
                }
              }
            },
          );
        } else if (resource.resourceKey === RESOURCE_DEFAULT.PAYMENT.key) {
          resource.permissions.forEach(
            (permission: {
              permissionId: number;
              permissionName: string;
              permissionKey: string;
            }) => {
              if (permission.permissionKey === PERMISSION_DEFAULT.VIEW.key) {
                let isExist = false;
                leftMenuList?.forEach((record) => {
                  if (record?.key === ROUTE_PATH.payment) {
                    isExist = true;
                  }
                });
                if (!isExist) {
                  leftMenuList?.push(PAYMENT_PATH);
                }
              }
            },
          );
        }
      },
    );
  }
  useBeAtTop();
  useBeforeRender(() => {
    setMenuLeft(leftMenuList);
  }, []);
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.clear();
    history.push(ROUTE_PATH.login);
  };

  useBeforeRender(() => {
    window.addEventListener("error", (e) => {
      if (e) {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div",
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay",
        );
        if (resizeObserverErr)
          resizeObserverErr.className = "hide-resize-observer";
        if (resizeObserverErrDiv)
          resizeObserverErrDiv.className = "hide-resize-observer";
      }
    });
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [updateAdmin.refresh]);

  const getUserInfo = () => {
    GetCurrentUserService.run(dispatch);
  };

  const items: MenuProps["items"] = [
    {
      key: ROUTE_PATH.profile,
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: ROUTE_PATH.changePassword,
      label: "Change Password",
      icon: <UnlockOutlined />,
    },
    {
      key: "",
      label: (
        <a
          href={USER_MANUAL_GUIDE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Help
        </a>
      ),
      icon: <InfoCircleOutlined />,
    },
    {
      key: ROUTE_PATH.logout,
      label: "Logout",
      icon: <PoweroffOutlined />,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (events) => {
    const url = window.location.pathname.split("/")[1];

    if (events.key) {
      if (url === "company-create-new") {
        dispatch(showConfirmationModal({ targetUrl: events.key }));
      } else if (events.key === ROUTE_PATH.logout) {
        LogoutService.run(
          dispatch,
          { user: localStorage.getItem("userID") },
          onLogout,
        );
        localStorage.clear();
        history.push(ROUTE_PATH.login);
      } else {
        history.push(events.key);
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem(STORAGES_CONFIG.openMenu) ?? "[]");
  });

  const onOpenChange: MenuProps["onOpenChange"] = (key) => {
    setOpenKeys(key);
    localStorage.setItem(STORAGES_CONFIG.openMenu, JSON.stringify(key));
  };

  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    return JSON.parse(
      localStorage.getItem(STORAGES_CONFIG.selectedKeys) ?? "[]",
    );
  });

  const handleMenuSelect = ({ key }: any) => {
    setSelectedKeys([key]);
    localStorage.setItem(STORAGES_CONFIG.selectedKeys, JSON.stringify([key]));
  };

  return (
    <Layout className="min-vh-100">
      <Header
        style={{ position: "sticky", top: 0, zIndex: 100, width: "100%" }}
      >
        <div className="logo d-inline">
          <img
            onClick={() => {
              history.push(ROUTE_PATH.home);
            }}
            src={IMAGES.logo}
            alt="Chat"
            className="logo"
            style={{ height: "50px", paddingTop: "5px", cursor: "pointer" }}
          />
        </div>
        <div className="pe-3 d-inline-flex float-end me-3">
          <label
            className="text-overflow"
            style={{
              color: "#FFFFFF",
              maxWidth: "75ch",
            }}
          >
            {user?.fullName ? user?.fullName : ""}
          </label>
          &ensp;
          <Dropdown menu={menuProps} placement="bottomLeft">
            <span style={{ cursor: "pointer" }} className="d-block">
              <UserAvatar size={40} />
            </span>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
          <Menu
            onClick={({ key }) => {
              const url = window.location.pathname.split(ROUTE_PATH.home)[1];
              if (url === "company-create-new") {
                dispatch(showConfirmationModal({ targetUrl: key }));
              } else history.push(key);
            }}
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={handleMenuSelect}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ height: "100%", borderRight: 0 }}
            items={menuLeft}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 0 24px 10px",
            marginLeft: "200px",
          }}
        >
          <Content
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            <div>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
