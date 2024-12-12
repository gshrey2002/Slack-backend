export default function crudRepo(model) {
    return {
        create:async function (data){
            const Model=await model.create(data);
            return Model
        },
        getAll:async function (){
            const Models=await model.find();
            return Models;
        },
        getById:async function (id){
            const Model=await model.findById(id);
            return Model;
        },
        deleteById:async function (id){
            const Model=await model.findByIdAndDelete(id);
            return Model;
        },
        updateById:async function (id,data){
            const Model=await model.findByIdAndUpdate(id,data,{new:true});
            return Model;
        },

    }

}