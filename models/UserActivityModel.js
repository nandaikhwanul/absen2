import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const UserActivity = db.define("UserActivity", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.ENUM('login', 'logout'),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    freezeTableName: true,
});

// Sinkronisasi otomatis (uncomment jika ingin mengupdate tabel)
// (async () => {
//     await UserActivity.sync({ alter: true });
// })();

export default UserActivity;
