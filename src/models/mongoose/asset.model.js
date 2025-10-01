import { Schema, Types, model } from "mongoose";

// TODO: completar relaciones embebidas y referenciadas

const AssetSchema = new Schema(
  {
    inventoryNumber: { type: String, required: true, unique: true },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    brand: { type: String, required: true, minlength: 2, maxlength: 100 },
    model: { type: String, required: true, minlength: 2, maxlength: 100 },
    status: {
      type: String,
      enum: ["good", "regular", "bad", "out_of_service"],
      default: "good",
    },
    acquisitionDate: { type: Date, required: true },
    acquisitionValue: { type: Number, required: true, min: 0 },
    //
    //Se coloca aca porque:
    //es donde nosotros "cargaremos" el ID del User al cual le pertenecerá
    //Y encima es el contrario de donde irá el VIRTUAL
    responsible: {
      type: Types.ObjectId,
      ref: "User",
    },
    category:{ //Aca voy a "Cargar" las Categorys al crear una Assets
      type:[Types.ObjectId],
      reg:"Category",
      required:true
    }
  },
  { timestamps: true }
);

export const AssetModel = model("Asset", AssetSchema);
