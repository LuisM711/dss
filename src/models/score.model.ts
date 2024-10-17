import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { proyecto } from "./proyectos.model";
import { alternativas } from "./alternativas.model";
import { criterio } from "./criterios.model";


interface scoreAttributes{
    id_proyecto: number,
    id_alternativa: number,
    score: number
}

//interface matrizCreationAttributes extends Optional<matrizAttributes, 'id'>{}

class score extends Model<scoreAttributes> implements scoreAttributes{
    public id_proyecto!: number;
    public id_alternativa!: number;
    public score!: number;
}

score.init({
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
    score:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false
    }
},{
    sequelize,
    tableName:'tb_score',
    timestamps:false,
});
export { score as scoreModel };