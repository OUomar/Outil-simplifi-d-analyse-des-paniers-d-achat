import mongoose, { Schema, Document } from 'mongoose';

interface ISale extends Document {
  SaleID: string;
  ProductID: string;
  Quantity: number;
  Date: Date;
  TotalAmount: number;
}

const SaleSchema: Schema = new Schema({
  SaleID: { type: String, required: true },
  ProductID: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Date: { type: Date, required: true },
  TotalAmount: { type: Number, required: true },
});

export default mongoose.model<ISale>('Sale', SaleSchema, 'sales');
