import { Request, Response } from "express";
import { SampleService } from "./sample.service";

export class SampleController {
  private sampleService: SampleService;

  constructor() {
    this.sampleService = new SampleService();
  }

  getSamples = async (req: Request, res: Response) => {
    const result = await this.sampleService.getSamples();
    res.status(200).send(result);
  };

  getSample = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.sampleService.getSample(id);
    res.status(200).send(result);
  };

  createSample = async (req: Request, res: Response) => {
    const result = await this.sampleService.createSample(req.body);
    res.status(200).send(result);
  };  

  sendEmail = async (req: Request, res: Response) => {
    const result = await this.sampleService.sendEmail(req.body.email);
    res.status(200).send(result);
  };  

  uploadImage = async (req: Request, res: Response) => {
    const files = req.files as { [filename: string]: Express.Multer.File[]}
    const image = files.image?.[0];
    const result = await this.sampleService.uploadImage(image);
    res.status(200).send(result);
  };  
}
