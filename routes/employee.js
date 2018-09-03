import express from 'express';
import Employee from '../models/employee';

const employeeRouter = express.Router();

employeeRouter.use('/:employeeId', async (req, res, next) => {
  try {
    let emp = await Employee.findById(req.params.employeeId).exec();
    req.employee = emp;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
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
    });;
    res.status(200).send(newEmployee);
  });

employeeRouter.route('/:employeeId')
  .get(async (req, res) => {
    res.json(req.employee);
  })
  .put(async (req, res) => {
    req.employee.name = req.body.name ? req.body.name : req.employee.name;
    req.employee.email = req.body.email ? req.body.email : req.employee.email;
    req.employee.position = req.body.position ? req.body.position : req.employee.position;
    req.employee.department = req.body.department ? req.body.department : req.employee.department;
    req.employee.companyId = req.body.companyId ? req.body.companyId : req.employee.companyId;
    req.employee.companyName = req.body.companyName ? req.body.companyName : req.employee.companyName;
    let newOne = await req.employee.save().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.json(req.employee);
  })
  .delete(async (req, res) => {
    let deletedOne = await Employee.findOneAndDelete({ _id: req.params.employeeId }).exec().catch((err) => {
      console.log('Something went wrong! ', err);
      res.status(500).send(err);
    });
    res.status(204).send('removed')
  });

export default employeeRouter;