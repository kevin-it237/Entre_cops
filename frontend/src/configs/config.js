export const rootUrl = "http://localhost:5000";
// export  const rootUrl = "http://entrecops.co:5000";
export const API_URL = process.env.NODE_ENV === 'production'
    ? 'http://entrecops.co:5000'
    : 'http://localhost:5000'