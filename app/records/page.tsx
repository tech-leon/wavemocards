import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
    "id": "728ed52f",
    "amount": 100,
    "status": "pending",
    "email": "m@example.com "
    },
    {
    "id": "489e1d42",
    "amount": 125,
    "status": "processing",
    "email": "example@gmail.com "
    },
    {
    "id": "f7a4b2c5",
    "amount": 150,
    "status": "success",
    "email": "user@example.com "
    },
    {
    "id": "6e8fc6d1",
    "amount": 175,
    "status": "success",
    "email": "support@domain.com "
    },
    {
    "id": "b5c4a0f7",
    "amount": 200,
    "status": "pending",
    "email": "info@example.net "
    },
    {
    "id": "d1e6b2d9",
    "amount": 225,
    "status": "processing",
    "email": "admin@company.com "
    },
    {
    "id": "f4c3df8a",
    "amount": 250,
    "status": "success",
    "email": "customer1@example.org "
    },
    {
    "id": "9b7e5e14",
    "amount": 275,
    "status": "success",
    "email": "user2@domain.net "
    },
    {
    "id": "3d8f0d4a",
    "amount": 300,
    "status": "pending",
    "email": "john.doe@example.com "
    },
    {
    "id": "b5f7a88e",
    "amount": 325,
    "status": "processing",
    "email": "user3@company.org "
    },
    {
    "id": "1c5d8fe4",
    "amount": 350,
    "status": "success",
    "email": "support1@example.net "
    },
    {
    "id": "e2b9d6f0",
    "amount": 375,
    "status": "success",
    "email": "info@company.com "
    },
    {
    "id": "a3df8a5c",
    "amount": 400,
    "status": "pending",
    "email": "jane.doe@example.net "
    },
    {
    "id": "f6e4b1ee",
    "amount": 425,
    "status": "processing",
    "email": "user4@domain.org "
    },
    {
    "id": "0c7a2d38",
    "amount": 450,
    "status": "success",
    "email": "support2@example.com "
    },
    {
    "id": "9b1f8b77",
    "amount": 475,
    "status": "success",
    "email": "admin@company.net "
    },
    {
    "id": "1e7c3a15",
    "amount": 500,
    "status": "pending",
    "email": "john.doe@example.org "
    }
    ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
