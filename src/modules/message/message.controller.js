import { Massage } from "../../../DB/models/message.model.js"
import { catchError } from "../../middleware/catchError.js";

export const addMessage = catchError(async (req, res) => {
    
    await Massage.insertMany(req.body);

    res.json({ success: true, message: "message added!" });

});


export const allMessage = catchError(async (req, res) => {
  let isMessage = await Massage.find({ receivedId: req.user.userId });

  res.json({ success: true, isMessage });
});