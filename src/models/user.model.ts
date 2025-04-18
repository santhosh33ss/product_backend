import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);


export default User;














// import mongoose, { Document, Schema, Model } from 'mongoose';

// // 1. Interface for the User document
// export interface IUser extends Document {
//   name: string;  
//   email: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // 2. Class that encapsulates the User model
// class UserModel {
//   private schema: Schema<IUser>;  
//   private model: Model<IUser>;

//   constructor() {
//     this.schema = new mongoose.Schema<IUser>(
//       {
//         name: {
//           type: String,  
//           required: true,
//         },
//         email: {
//           type: String,  
//           required: true,
//           unique: true,
//         },
//         password: {
//           type: String,  
//           required: true,
//         },
//       },
//       { timestamps: true }
//     );

//     this.model = mongoose.model<IUser>('User', this.schema);
//   }

//   // Expose the model instance
//   public getModel(): Model<IUser> {
//     return this.model;  
//   }
// }

// // 3. Export a single instance of the class (Singleton-style)
// const userModelInstance = new UserModel();
// export default userModelInstance.getModel();












