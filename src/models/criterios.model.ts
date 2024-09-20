import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { proyecto } from "./proyectos.model";

interface criterioAttributes{
    id: number,
    id_proyecto: number,
    nombre: string,
    descripcion: string,
    peso: number
}

interface criterioCreationAttributes extends Optional<criterioAttributes, 'id'>{}

class criterio extends Model<criterioAttributes, criterioCreationAttributes> implements criterioAttributes{
    public id!: number;
    public id_proyecto!: number;
    public nombre!: string;
    public descripcion!: string;
    public peso!: number;
}

criterio.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_proyecto:{
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model: proyecto,
            key: 'id'
        }
    },
    nombre:{
        type:DataTypes.STRING(50),
        allowNull: false
    },
    descripcion:{
        type:DataTypes.STRING(200),
        allowNull: false
    },
    peso:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    tableName:'tb_criterios',
    timestamps:false,
});
export { criterio };