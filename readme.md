## NodeJS API - Employee-api

This NodeJS app is a basic REST API connected to a mongoDB database. In order to run this app you need node 8, mongodb, docker.
*Note: We're storing the name and the ID of the company of each employee for display purpose.*

### Endpoints

- (GET) /employee/: list all employees
- (GET) /employee/{id}: Returns a specific employee
- (POST) /employee/: Create an employee
- (PUT) /employee/{id}: Update an employee
- (DELETE) /employee/{id}: Delete an employee

### Running the app

#### Local:

First terminal:

```bash
mongod
```

Second terminal:

```bash
npm i
npm start
```

#### Docker local:

```bash
docker-compose up # this will build / run the application and also run a mongodb server
```

### Testing the app

```bash
curl -XPOST http://localhost:8000/employee/ -H 'Content-type: Application/json' --data '{"name":"John SMITH", "email":"john.smith@gmail.com", "position":"Manager", "department": "HR", "companyId": "<CompanyId>", "companyName": "Microsoft"}'
curl -XGET http://localhost:8000/employee/{id}
curl -XGET http://localhost:8000/employee/
curl -XPUT http://localhost:8000/employee/{id} -H 'Content-type: Application/json' --data '{"position":"Chief"}'
```