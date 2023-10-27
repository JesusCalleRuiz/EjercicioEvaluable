import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascota = async (_req: Request, res: Response) => {
  try {
    const mascota = await MascotaModel.find().exec();
    if (!mascota) {
      res.status(404).send("Mascota not found");
      return;
    }
    res.status(200).send({
      name: mascota.name,
      description: mascota.description,
      type: mascota.type,
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMascota;