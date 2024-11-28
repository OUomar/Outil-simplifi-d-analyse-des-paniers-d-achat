import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  ProductID: string;
  ProductName: string;
  Category: string;
  Price: number;
}

const ProductSchema: Schema = new Schema({
  ProductID: { type: String, required: true },
  ProductName: { type: String, required: true },
  Category: { type: String, required: true },
  Price: { type: Number, required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema, 'products');
