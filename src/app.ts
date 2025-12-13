import express, {Request, Response} from 'express';

const app = express();
const port = 592;

app.get('/', (req: Request, res: Response) => {
    res.send("This is the home page of the codello.");
})

app.get('/profile', (req: Request, res: Response) => {
    res.send("This is the profile page of the codello.");
})

app.post('/profile', (req: Request, res: Response) => {
    res.send("The request to save data of the profile to the database is successfully done.")
})

app.delete('/profile', (req: Request, res: Response) => {
    res.send("The request to delete data of the profile to the database is successfully done.")
})

app.patch('/profile', (req: Request, res: Response) => {
    res.send("The request to edit data of the profile to the database is successfully done.")
})



app.listen(port, () => {
    console.log("Codello server is up and running at - ", `http://localhost:${port}/`)
})