export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/authorize",
    "/manageUser",
    "/manageStaff",
    "/properties",
    "/assign",
    "/dashboard",
    "/dashboardOrder",
  ],
};
