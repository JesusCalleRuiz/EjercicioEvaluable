import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const addMascota = async (req: Request, res: Response) => {
  try {
    const{id} = req.body;
    const { name, description, type } = req.body;
    if (!name || !description || !type) {
      res.status(400).send("Name, description and type are required");
      return;
    }

    if (type != "perros" || type != "gatos" ||type != "serpientes") {
        res.status(404).send("type not valid");
        return;
      }

    const alreadyExists = await MascotaModel.findOne({ id }).exec();
    if (alreadyExists) {
      res.status(400).send("Mascota already exists");
      return;
    }

    const newMascota = new MascotaModel({ name, description, type });
    await newMascota.save();

    res.status(200).send({
      name: newMascota.name,
      age: newMascota.description,
      dni: newMascota.type,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMascota;