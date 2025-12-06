import express, {Request, Response} from 'express';

const app = express();
const port = 592;

app.get('/', (req: Request, res: Response) => {
    res.send("This is the home page of the codello.");
})

app.get('/profile', (req: Request, res: Response) => {
    res.send("This is the profile page of the codello.");
})

app.get('/friend-request', (req: Request, res: Response) => {
    res.send("This is the friend request page of the codello.");
})


app.listen(port, () => {
    console.log("Codello server is up and running.")
})