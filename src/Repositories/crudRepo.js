export default function crudRepo() {
    return {
        create:async function (data){
            const Model=await this.create(data);
            return Model
        },
        getAll:async function (){
            const Models=await this.find();
            return Models;
        },
        getById:async function (id){
            const Model=await this.findById(id);
            return Model;
        },
        deleteById:async function (id){
            const Model=await this.findByIdAndDelete(id);
            return Model;
        },
        updateById:async function (id,data){
            const Model=await this.findByIdAndUpdate(id,data,{new:true});
            return Model;
        },

    }

}