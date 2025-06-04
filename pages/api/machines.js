import { mongooseConnect } from "@/lib/mongoose";
import { Machine } from "@/models/Machine";

export default async function handle(req, res) {
  //if authenticated, connect to MongoDb
  await mongooseConnect();

  const { method } = req;
 
  if (method === "POST") {
    const { title, slug, images, description, tags, afilink, status } =
      req.body;

      const productDoc = await Machine.create({
        title, slug, images, description, tags, afilink, status
      })

      res.json(productDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
        res.json(await Machine.findById(req.query.id))
    } else {
        res.json((await Machine.find()).reverse())
    }
  }

  if (method === 'PUT') {
    const { _id, title, slug, images, description, tags, afilink, status } = req.body;

    await Machine.updateOne({_id}, {
        title, slug, images, description, tags, afilink, status  
    });

    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
        await Machine.deleteOne({_id: req.query?.id})
        res.json(true)
    }
  }
}
