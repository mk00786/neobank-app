import mongooose from 'mongoose'

const userSchema=new mongooose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

export default mongooose.model('User',userSchema);