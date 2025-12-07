import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {

  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email);


      res.status(201).json({
      success: false, 
      message: "User data created successfully",
      data: result.rows[0],
    });


  }catch(err: any){
    res.status(500).json({
      success: false, 
      message: err.message
    });
  }

}



const getUser =  async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}




const getSingleUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.getSingleUser(req.params.id as string);
    if (result.rows.length === 0) {
      return  res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}





const updateUser =  async (req: Request, res: Response) => {
  // const userId = req.params.id;
  const { name, email } = req.body;
  try {
    const result = await userServices.updateUser(name, email, req.params.id as string);
    if (result.rows.length === 0) {
      return  res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data Updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}






const deleteUser =  async (req: Request, res: Response) => {
  // const userId = req.params.id;   
  try {
    const result = await userServices.deleteUser(req.params.id as string);
    if (result.rows.length === 0) {
      return  res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data Deleted successfully",
      // data: result.rows[0],
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
}








export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser
}
















