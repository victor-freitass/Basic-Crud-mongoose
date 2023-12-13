import { Request, Response, Router } from "express";
import Service from '../models/Service'

class ServiceController {
    async index (req: Request, res: Response): Promise<Response> {
        const allServices = await Service.find();
        return res.json(allServices);
    };  

    async getById (req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const serviceFromDB = await Service.findById(id);
        return res.json(serviceFromDB || "Service does not found or not exists");
    };

    async create (req: Request, res: Response): Promise<Response> {
        const { name, description, price, image } = req.body;

        try {
            const service = Object.assign({
                name, 
                description, 
                price, 
                image
            });
            await Service.create(service);
            return res.status(201).json(service);
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    async update(req: Request, res: Response): Promise<Response> {
        const { name, description, price, image } = req.body;   
        const id = req.params.id

        try  {
            const service = Object.assign({
                name, 
                description,
                price,
                image
            });

            const serviceExists = Service.findById(id);
            if (!serviceExists) return res.status(404).json({msg: 'Services does not exists'});

            const oldService = await Service.findByIdAndUpdate(id, service);
            return res.json({
                previousService: oldService,
                newService: service
            });
        } catch (error) {
            return res.status(500).send()
        }
    }

    async delete (req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const serviceExists = Service.findById(id);
        if (!serviceExists) return res.status(404).json({msg: 'Services does not exists'});

        const deletedService = await Service.findByIdAndDelete(id)
        return res.json(deletedService)
    }

    async servicesBetweenTwoPrices (req: Request, res: Response): Promise<Response> { 
        const { minPrice, maxPrice } = req.body;

        if (!minPrice || !maxPrice) {
            return res.status(400).send('Inform the values (minPrice, maxPrice)');
        }

        const servicesFilter = await Service.find({price: {$gte: minPrice, $lte: maxPrice}}); 
        return res.send(servicesFilter);
    }

    
}
export default new ServiceController();