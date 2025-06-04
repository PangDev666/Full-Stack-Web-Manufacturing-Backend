import { mongooseConnect } from "@/lib/mongoose";
import { About } from "@/models/About";

export default async function handle(req, res) {
  //if authenticated, connect to MongoDb
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    const { title, slug, images, description, tags, status } =
      req.body;

      const productDoc = await About.create({
        title, slug, images, description, tags, status 
      })

      res.json(productDoc)
  }

  if (method === 'GET') {
    if (req.query?.id) {
        res.json(await About.findById(req.query.id))
    } else {
        res.json((await About.find()).reverse())
    }
  }

  if (method === 'PUT') {
    const { _id,  title, slug, images, description, tags, status } = req.body;

    await About.updateOne({_id}, {
        title, slug, images, description, tags, status   
    });

    res.json(true)
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
        await About.deleteOne({_id: req.query?.id})
        res.json(true)
    }
  }
}
