import express, { Request, Response } from 'express';

export const app = express();

app.use(express.json());

app.post('/', (req: Request, res: Response) => {
	console.log('req', req.body);
	// console.log('res', res);
});
