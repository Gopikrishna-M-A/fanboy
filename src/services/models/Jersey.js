import mongoose from 'mongoose';

const JerseySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['international', 'club'] },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  variant: { type: String, required: true, enum: ['firstcopy', 'master', 'player'] },
  price: { type: Number, required: true, min: 0 },
  mrp: { type: Number, required: true, min: 0 },
  size: { type: String},
  stock: { type: Number, required: true, min: 0 },
  images: { type: [String] },
  sizeChart: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

JerseySchema.index({ name: 'text', description: 'text' });

JerseySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Jersey || mongoose.model('Jersey', JerseySchema);