import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const employeeModel = new Schema({
  name: { type: String },
  email: { type: String },
  position: { type: String },
  department: { type: String },
  companyName: { type: String },
  companyId: { type: String }
})
export default mongoose.model('employee', employeeModel)