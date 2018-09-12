import express from 'express';
import Employee from '../models/employee';

const employeeRouter = express.Router();

employeeRouter.get('/company/:compId', async (req, res) => {
  const getByCompId = await Employee
    .find({ companyId: String(req.params.compId) })
    .exec().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
  res.json(getByCompId);
});

employeeRouter.route('/')
  .get(async (req, res) => {
    const getAll = await Employee.find({}).exec().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.json(getAll);
  })
  .post(async (req, res) => {
    const employee = new Employee(req.body);
    let newEmployee = await employee.save().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.status(200).send(newEmployee);
  });

employeeRouter.route('/:employeeId')
  .get(async (req, res) => {
    try {
      let emp = await Employee.findById(req.params.employeeId).exec();
      res.json(emp);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .put(async (req, res) => {
    try {
      let emp = await Employee.findById(req.params.employeeId).exec();
    } catch (err) {
      res.status(500).send(err);
    }
    emp.name = req.body.name ? req.body.name : emp.name;
    emp.email = req.body.email ? req.body.email : emp.email;
    emp.position = req.body.position ? req.body.position : emp.position;
    emp.department = req.body.department ? req.body.department : emp.department;
    emp.company = req.body.company ? req.body.company : emp.company;
    emp.companyName = req.body.companyName ? req.body.companyName : emp.companyName;
    let newOne = await emp.save().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.json(emp);
  })
  .delete(async (req, res) => {
    let deletedOne = await Employee.findOneAndDelete({ _id: req.params.employeeId }).exec().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.status(204).send('removed')
  });

export default employeeRouter;