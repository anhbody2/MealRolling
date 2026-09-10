import userRoutes from "./User.route.js";
import authRoutes from "./Auth.route.js";
import favoriteRoutes from "./Favorite.route.js"
import categoryRoutes from "./Category.route.js"
import productRoutes from "./Product.route.js"
export function apiRouter(app) {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/favor", favoriteRoutes);
    app.use("/api/category", categoryRoutes);
    app.use("/api/product", productRoutes);
}
