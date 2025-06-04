import { mongooseConnect } from "@/lib/mongoose";
import { Plant } from "@/models/Plant";

export default async function handle(req, res) {
  //if authenticated, connect to MongoDb
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    const { title, slug, images, description, client, plantcategory, tags, livepreview, status } =
      req.body;

      const productDoc = await Plant.create({
        title, slug, images, description, client, plantcategory, tags, livepreview, status
      })

      res.json(productDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
        res.json(await Plant.findById(req.query.id))
    } else {
        res.json((await Plant.find()).reverse())
    }
  }

  if (method === 'PUT') {
    const { _id, title, slug, images, description, client, plantcategory, tags, livepreview, status } = req.body;

    await Plant.updateOne({_id}, {
        title, slug, images, description, client, plantcategory, tags, livepreview, status  
    });

    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
        await Plant.deleteOne({_id: req.query?.id})
        res.json(true)
    }
  }
}
