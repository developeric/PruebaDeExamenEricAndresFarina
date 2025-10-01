import { Schema, model } from "mongoose";

// TODO: configurar el virtuals para el populate inverso con assets

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: { type: String, maxlength: 500 },
  },
  { toJSON: { virtuals: true } },
  { timestamps: true }
);

CategorySchema.virtual("assets",
  {
ref:"Assets",
localField: "_id",
foreignField:"category"
})
// ! FALTA COMPLETAR ACA

export const CategoryModel = model("Category", CategorySchema);
