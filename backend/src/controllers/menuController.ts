import { Request, Response} from "express";
import Menu from "../models/Menu";

//Create Menu Item
export const createMenu =  async (req: Request, res: Response) => {
    try{
        const menu = await Menu.create(req.body);

        res.status(201).json({
            success: true,
            message: "Menu item created successfully",
            menu,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create menu item",
        });
    }
};

// Get All Menu Items
export const getMenus = async (req: Request, res: Response) => {
    try {
        const menus = await Menu.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            menus,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch menu items",
        });
    }
};

// Update Menu Item
export const updateMenu = async (req: Request, res: Response) => {
    try{
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Menu item updated successfully",
            menu,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update menu ",
        });
    }
};

// Delete Menu Item
export const deleteMenu = async (req: Request, res: Response) => {
    try{
        await Menu.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Menu item deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete menu",
        });
    }
};