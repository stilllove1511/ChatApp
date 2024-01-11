const PAGINATION_CONFIG = {
  lastPages: (pageNow: number, pageSize: number, total: number) => {
    const lastPages = Math.ceil(total / pageSize);
    if (lastPages === 0) return 1;
    if (pageNow >= lastPages) return lastPages;
    else return pageNow;
  },
};

export default PAGINATION_CONFIG;
