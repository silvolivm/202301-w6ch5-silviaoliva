import { Request, Response } from 'express';
import { Fruits, FruitsRepoStructure } from '../repository/fruits.file.repo.js';

export class FruitsController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: FruitsRepoStructure) {}

  getAll(_req: Request, resp: Response) {
    this.repo.read().then((data) => resp.json(data));
  }

  get(req: Request, resp: Response) {
    this.repo
      .readOne(Number(req.params.id))
      .then((data) => (data === undefined ? resp.send('') : resp.json(data)));
  }

  async post(req: Request, resp: Response) {
    console.log(req.body);
    const data = await this.repo.write(req.body);
    console.log(data);
    resp.json(req.body);
  }

  async update(req: Request, resp: Response) {
    const updateInfo = req.body as Partial<Fruits>;
    const dataToUpdate = await this.repo.readOne(Number(req.params.id));
    const updatedItem = Object.assign(dataToUpdate, updateInfo);
    console.log(updatedItem);
    await this.repo.update(updatedItem);
    console.log('Data' + updatedItem);
    resp.send('updated');
  }

  async delete(req: Request, resp: Response) {
    await this.repo.delete(Number(req.params.id));
    console.log(`<p>deleted item ${req.params.id}`);
    resp.json({});
  }
}
