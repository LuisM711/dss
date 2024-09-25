import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { proyecto } from "./proyectos.model";
import { alternativas } from "./alternativas.model";
import { criterio } from "./criterios.model";


interface matrizAttributes{
    id_proyecto: number,
    id_alternativa: number,
    id_criterio: number,    
    valor: number,
}

//interface matrizCreationAttributes extends Optional<matrizAttributes, 'id'>{}

class matriz extends Model<matrizAttributes> implements matrizAttributes{
    public id_proyecto!: number;
    public id_alternativa!: number;
    public id_criterio!: number;
    public valor!: number;
}

matriz.init({
    id_proyecto:{
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model: proyecto,
            key:'id'
        }
    },
    id_alternativa:{
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model: alternativas,
            key: 'id'
        }
    },
    id_criterio:{
        type:DataTypes.INTEGER.UNSIGNED,
        references:{
            model: criterio,
            key: 'id'
        }
    },
    valor:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }
},{
    sequelize,
    tableName:'tb_matriz',
    timestamps:false,
});
export { matriz };