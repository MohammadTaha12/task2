import { Router, Response, Request, NextFunction } from "express";
import { createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers } from '../controllers/customer.js';
import { Customer } from "../db/entities/Customer.js";

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const payload: Customer = req.body;
    if (!payload.mobilePhone || !payload.name || !payload.balance) {
        res.json({
            messege: "Some feilds are missing",
            success: false
        })
        return;
    }
    try {
        const task = await createCustomer(payload)
        res.json({
            messege: "Customer created successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
});


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    try {
        const customer = await removeCustomer(id)

        res.json({
            messege: "customer removed successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
})

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const payload: Customer = req.body;
    if (!payload.mobilePhone || !payload.name || !payload.balance) {
        res.json({
            messege: "Some feilds are missing",
            success: false
        })
        return;
    }
    try {
        const task = await editCustomer(id, payload)

        res.json({
            messege: "Customer edited successfully",
            success: true
        })
    } catch (error) {
        console.log("Error" + error);
        next(error)
    }
});


router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Id = Number(req.params.id)
        const customer = await getCustomer(Id)

        console.log("entered");


        res.json({
            message: "customer created successfully",
            customer: customer
        })
    } catch (error) {
        console.log("error: " + error);
        next(error)
    }
});



router.get('/', getAllCustomers);

export default router;