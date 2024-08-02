import { Request, Response, NextFunction } from 'express'
import dataSource from '../db/dbConfig.js';
import { Customer } from '../db/entities/Customer.js'
import { AppError } from '../errors/AppErrors.js'

const createCustomer = async (payload: Customer) => {
    const customer = await Customer.findOne({
        where: {
            mobilePhone: payload.mobilePhone
        }
    })
    if (customer) {
        throw new AppError("mobilePhone already exits", 409, true)
    }

    const newcustomer = Customer.create(payload)
    return newcustomer.save()
}


const removeCustomer = async (id: number) => {
    const customer = await Customer.findOne({ where: { id: id } })
    if (!customer) {
        throw new AppError("Customer not found ", 404, true)
    }

    return ((await customer.remove()))
}


const editCustomer = async (id: number, payload: Customer) => {
    const customer = await Customer.findOne({ where: { id: id } })

    if (!customer) {
        throw new AppError("Customer not found ", 404, true)
    }

     const phoneCustomer = await Customer.findOne({
        where: {
            mobilePhone: payload.mobilePhone
        }
    })

    if (phoneCustomer) {
        throw new AppError("mobilePhone already exits", 409, true)
    }

    customer.name = payload.name
    customer.mobilePhone = payload.mobilePhone
    customer.balance = payload.balance

    return customer.save()
};


const getCustomer = async (id: number) => {
    const customer = await Customer.findOne({ where: { id: id } })

    if (!customer) {
        throw new AppError("customer not found", 404, true)
    }

    return customer
};

const getAllCustomers = async (req: Request, res: Response) => {
    const customers = await Customer.find()

    res.json({
        message: "Getting all tasks",
        customers: customers
    })
};
export { createCustomer, removeCustomer, editCustomer, getCustomer, getAllCustomers }