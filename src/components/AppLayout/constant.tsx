import { ROUTE_PATH } from "@ts/enums";
import IMAGES from "@assets/images";

export const CMS_NORMAL_USER_PATH = {
  key: ROUTE_PATH.users,
  icon: <img src={IMAGES.userManagerIcon} alt="userManagerIcon" />,
  label: "Users Management",
  children: [
    {
      key: ROUTE_PATH.listUsersLandingPage,
      label: "Landing Page Users",
    },
  ],
};

export const SUPER_ADMIN_PATH = {
  key: ROUTE_PATH.users,
  icon: <img src={IMAGES.userManagerIcon} alt="userManagerIcon" />,
  label: "Users Management",
  children: [
    {
      key: ROUTE_PATH.listUsers,
      label: "CMS Users",
    },
    {
      key: ROUTE_PATH.listUsersLandingPage,
      label: "Landing Page Users",
    },
  ],
};

export const ROLE_PATH = {
  key: ROUTE_PATH.roles,
  icon: <img src={IMAGES.roleManagerIcon} alt="roleManagerIcon" />,
  label: "Roles Management",
  children: [
    {
      key: ROUTE_PATH.listRoles,
      label: "List roles CMS",
    },
    {
      key: ROUTE_PATH.listRolesLandingPage,
      label: "List roles Landing Page",
    },
  ],
};

export const ROLE_CMS_PATH = {
  key: ROUTE_PATH.listRoles,
  label: "List roles CMS",
};

export const ROLE_LP_PATH = {
  key: ROUTE_PATH.listRolesLandingPage,
  label: "List roles Landing Page",
};

export const USER_CMS_PATH = {
  key: ROUTE_PATH.listUsers,
  label: "CMS Users",
};

export const USER_LP_PATH = {
  key: ROUTE_PATH.listUsersLandingPage,
  label: "Landing Page Users",
};

export const COMPANY_PATH = {
  key: ROUTE_PATH.listCompany,
  label: "Company",
};

export const INDUSTRY_PATH = {
  key: ROUTE_PATH.companyListIndustry,
  label: "Industry",
};

export const COUNTRY_PATH = {
  key: ROUTE_PATH.companyListCountry,
  label: "Country",
};

export const REGION_PATH = {
  key: ROUTE_PATH.companyListRegion,
  label: "Region",
};

export const PERSON_PATH = {
  key: ROUTE_PATH.person,
  icon: <img src={IMAGES.personIcon} alt="personIcon" />,
  label: "Person",
  children: [
    {
      key: ROUTE_PATH.listPerson,
      label: "Person",
    },
  ],
};

export const TRANSACTION_PATH = {
  key: ROUTE_PATH.transaction,
  icon: <img src={IMAGES.transactionIcon} alt="transactionIcon" />,
  label: "Transaction",
  children: [
    {
      key: ROUTE_PATH.listTransaction,
      label: "Transaction",
    },
  ],
};

export const NEWS_PATH = {
  key: ROUTE_PATH.news,
  icon: <img src={IMAGES.newsIcon} alt="newsIcon" />,
  label: "News",
  children: [
    {
      key: ROUTE_PATH.listNews,
      label: "News",
    },
  ],
};

export const INVESTOR_PATH = {
  key: ROUTE_PATH.investor,
  icon: <img src={IMAGES.investorIcon} alt="investorIcon" />,
  label: "Investor & Fund",
  children: [
    {
      key: ROUTE_PATH.listInvestor,
      label: "Investor & Fund",
    },
  ],
};

export const Insight_PATH = {
  key: ROUTE_PATH.insight,
  icon: <img src={IMAGES.insightIcon} alt="insightIcon" />,
  label: "Insight",
  children: [
    {
      key: ROUTE_PATH.listInsight,
      label: "Insight",
    },
  ],
};

export const Analysis_PATH = {
  key: ROUTE_PATH.analysis,
  icon: <img src={IMAGES.analysisIcon} alt="analysisIcon" />,
  label: "Analysis & Survey",
  children: [
    {
      key: ROUTE_PATH.listAnalysis,
      label: "Analysis & Survey",
    },
  ],
};

export const VIDEO_PATH = {
  key: ROUTE_PATH.video,
  icon: <img src={IMAGES.videoIcon} alt="videoIcon" />,
  label: "Video",
  children: [
    {
      key: ROUTE_PATH.videoDistribution,
      label: "Video Distribution",
    },
  ],
};

export const PAYMENT_PATH = {
  key: ROUTE_PATH.payment,
  icon: <img src={IMAGES.paymentIcon} alt="paymentIcon" />,
  label: "Payment",
  children: [
    {
      key: ROUTE_PATH.paymentHistory,
      label: "Payment history",
    },
  ],
};
