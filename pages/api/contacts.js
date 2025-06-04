import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/Contact";

export default async function handle(req, res) {
  //if authenticated, connect to MongoDb
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    const { name, lname, email, company, phone, country, description } =
      req.body;

      const productDoc = await Contact.create({
        name, lname, email, company, phone, country, description
      })

      res.json(productDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
        res.json(await Contact.findById(req.query.id))
    } else {
        res.json((await Contact.find()).reverse())
    }
  }

  if (method === 'PUT') {
    const { _id, name, lname, email, company, phone, country, description } = req.body;

    await Contact.updateOne({_id}, {
        name, lname, email, company, phone, country, description  
    });

    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
        await Contact.deleteOne({_id: req.query?.id})
        res.json(true)
    }
  }
}
