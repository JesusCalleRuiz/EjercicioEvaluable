import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const updateMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name,description,type } = req.body;
    if (!name || !description|| !type) {
      res.status(400).send("Name and description and type are required");
      return;
    }

    const updateMascota = await MascotaModel.findOneAndUpdate(
      { id },
      { name, description, type },
      { new: true }
    ).exec();

    if (!updateMascota) {
      res.status(404).send("Mascota not found");
      return;
    }

    res.status(200).send({
      name: updateMascota.name,
      description: updateMascota.description,
      type: updateMascota.type,
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMascota;