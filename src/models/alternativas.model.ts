import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { proyecto } from "./proyectos.model";

interface alternativasAttributes{
    id: number,
    id_proyecto: number,
    nombre: string,
    descripcion: string
}

interface alternativasCreationAttributes extends Optional<alternativasAttributes, 'id'>{}

class alternativas extends Model<alternativasAttributes, alternativasCreationAttributes> implements alternativasAttributes{
    public id!: number;
    public id_proyecto!: number;
    public nombre!: string;
    public descripcion!: string
}

alternativas.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_proyecto:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model: proyecto,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    nombre:{
        type:DataTypes.STRING(60),
        allowNull: false
    },
    descripcion:{
        type:DataTypes.STRING(200),
        allowNull: false
    }
},{
    sequelize,
    tableName:'tb_alternativas',
    timestamps:false,
});
export { alternativas };