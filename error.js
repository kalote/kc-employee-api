export default function errorHandler(err, res) {
  console.log('Something went wrong! ', err);
  res.status(500).send(err);
}