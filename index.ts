import express, {Express, Request, Response} from "express"

const app: Express = express()
const port: number = 3000

app.use(express.json());

//Task1
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello world")
})

//Task2
type Vehicle = {
    model: string,
    color: string,
    year: number,
    power: number
};

//Task3
type Car = Vehicle & {
    bodyType: string;
    wheelCount: number;
};

type Plane = Vehicle & {
    wingspan: number;
}

type Boat = Vehicle & {
    draft: number;
}

const vehicles: Vehicle[] = [];

app.post('/vehicle/add', (req: Request, res: Response) => {
    const {model, color, year, power, bodyType, wheelCount, draft, wingspan} = req.body;

    let newVehicle: Car | Plane | Boat | undefined;

    if (bodyType !== undefined && wheelCount !== undefined) {
        newVehicle = {model, color, year, power, bodyType, wheelCount};
    }

    else if (draft !== undefined) {
        newVehicle = {model, color, year, power, draft};
    }

    else if (wingspan !== undefined) {
        newVehicle = {model, color, year, power, wingspan};
    }

    if (newVehicle !== undefined) {
        vehicles.push(newVehicle);
    }

    return res.status(201).json({message: 'Vehicle added'});
});

//Task4
app.get('vehicle/search/:model', (req: Request, res: Response) => {
    const {model} = req.params;

    const vehicleFound = vehicles.find((vehicle) => vehicle.model === model);

    if (vehicleFound) {
        return res.json(vehicleFound);
    }
    else {
        return res.status(404);
    }
});

app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port)
})
