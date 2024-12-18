import type { RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/nav.tsx", [
    index("routes/home.tsx"),
    route("shop/product/:itemId", "routes/product.tsx"),
    route("shop", "routes/shop.tsx"),
  ]),
] satisfies RouteConfig;
