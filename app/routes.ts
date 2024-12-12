import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/nav.tsx", [
    index("routes/home.tsx"),
    route("products/:itemId", "routes/product.tsx"),
  ]),
] satisfies RouteConfig;
