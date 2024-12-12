export default function crudRepo(schema) {
    return {
        model:schema,
        create:async function (data){
            const Model=await this.model.create(data);
            return Model;
        },
        getAll:async function (){
            const Models=await this.model.find();
            return Models;
        },
        getById:async function (id){
            const Model=await this.model.findById(id);
            return Model;
        },
        deleteById:async function (id){
            const Model=await this.model.findByIdAndDelete(id);
            return Model;
        },
        updateById:async function (id,data){
            const Model=await this.model.findByIdAndUpdate(id,data,{new:true});
            return Model;
        },

    }

}