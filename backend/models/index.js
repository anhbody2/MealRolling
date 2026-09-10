import sequelize from '../config/db.js';
import initModels from '../models/init-models.js';

const models = initModels(sequelize);

const {
    Category,
    Favorite,
    OrderItem,
    Order,
    Product,
    User,
} = models;

export { Category, Favorite, Order, OrderItem, Product, User };
export default models;
