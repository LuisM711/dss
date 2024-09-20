import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface proyectoAttributes{
    id: number,
    nombre: string,
    objetivo: string
}

interface proyectoCreationAttributes extends Optional<proyectoAttributes, 'id'>{}

class proyecto extends Model<proyectoAttributes, proyectoCreationAttributes> implements proyectoAttributes{
    public id!: number;
    public nombre!: string;
    public objetivo!: string;
}

proyecto.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    objetivo:{
        type:DataTypes.STRING(500),
        allowNull: false
    }
},{
    sequelize,
    tableName:'tb_proyectos',
    timestamps:false,
});
export { proyecto };