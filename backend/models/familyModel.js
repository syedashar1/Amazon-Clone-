import mongoose from 'mongoose';


const familySchema = new mongoose.Schema(
  {

        parent1:{
                name  : {type : String , required : true },
                age  : {type : Number , required : true },
                interests  : [String] ,
                ethnicity : {type : String , required : true},
                gender : {type : String , required : true}
        },
        parent2:{
                name  : {type : String },
                age  : {type : Number },
                interests  : [String] ,
                ethnicity : {type : String },
                gender : {type : String }
        },



        image1 : {type: String },
        image2 : {type: String },
        image3 : {type: String },
        image4 : {type: String },
        image5 : {type: String },
    
        child1:{
                name  : {type : String },
                age  : {type : Number  },
                interests  : [String] ,
                ethnicity : {type : String },
                gender : {type : String }
        },
        child2:{
                name  : {type : String },
                age  : {type : Number  },
                interests  : [String] ,
                ethnicity : {type : String },
                gender : {type : String }
        },
        child3:{
                name  : {type : String },
                age  : {type : Number  },
                interests  : [String] ,
                ethnicity : {type : String },
                gender : {type : String }
        },
        child4:{
                name  : {type : String },
                age  : {type : Number  },
                interests  : [String] ,
                ethnicity : {type : String },
                gender : {type : String }
        },
        
        othersLiked : [String] ,
        oursLiked : [String] ,
        Matched : [String] ,

        newMatch : true ,

        descriptions : {String} ,

        location : {String}

  },
  {
        timestamps: true,
}
);


const Family = mongoose.model('Family', familySchema);
export default Family;


      