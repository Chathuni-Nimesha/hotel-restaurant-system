import { Request, Response } from "express";
import Reservation from "../models/Reservation";



export const createReservation = async (
  req: Request,
  res: Response
) => {
  try {
    const count = await Reservation.countDocuments();

    console.log("Creating reservation...");
    console.log(`GR${1001 + count}`);
    
    const reservation = await Reservation.create({
      ...req.body,
      reservationNumber: `GR${1001 + count}`,
    });

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error: any) {
     console.log("========= Error ==========");
     console.log(error);
     console.log("=================")

     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getReservations = async (
  req: Request,
  res: Response
) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
      console.log("Reservation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
    });
  }
};

export const deleteReservation = async(  
  req: Request,
  res: Response
) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    console.log("Reservation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete reservation",
    });
  }
};

export const updateReservation = async(
  req: Request,
  res: Response
) => {
  try {
    const reservation =
      await Reservation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update reservation",
    });
  }
};