/* eslint-disable no-unused-vars */
import fs from 'fs/promises';
const file = 'data/fruits.json';
export type Fruits = {
  id: number;
  name: string;
  color: string;
};

export interface FruitsRepoStructure {
  read(): Promise<Fruits[]>;
  readOne(id: Fruits['id']): Promise<Fruits>;
  write(info: Fruits): Promise<void>;
  update(info: Fruits): Promise<void>;
  delete(info: Fruits['id']): Promise<void>;
}

export class FruitsFileRepo implements FruitsRepoStructure {
  read(): Promise<Fruits[]> {
    return fs
      .readFile(file, { encoding: 'utf-8' })
      .then((data) => JSON.parse(data) as Fruits[]);
  }

  async readOne(id: Fruits['id']) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parseData: Fruits[] = JSON.parse(data);
    return parseData.filter((item) => item.id === id)[0] as Fruits;
  }

  async write(info: Fruits) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parseData: Fruits[] = JSON.parse(data);
    const newId: number = Math.max(...parseData.map((item) => item.id));
    info.id = newId + 1;
    const finalData = JSON.stringify([...parseData, info]);
    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async update(info: Fruits) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parseData: Fruits[] = JSON.parse(data);
    const finalData = JSON.stringify(
      parseData.map((item) => (item.id === info.id ? info : item))
    );

    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }

  async delete(id: Fruits['id']) {
    const data = await fs.readFile(file, { encoding: 'utf-8' });
    const parseData: Fruits[] = JSON.parse(data);
    const finalData = JSON.stringify(
      parseData.filter((item) => item.id !== id)
    );

    await fs.writeFile(file, finalData, { encoding: 'utf-8' });
  }
}
