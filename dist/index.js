"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
//Task1
app.get("/hello", (req, res) => {
    res.send("Hello world");
});
const vehicles = [];
app.post('/vehicle/add', (req, res) => {
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan } = req.body;
    let newVehicle;
    if (bodyType !== undefined && wheelCount !== undefined) {
        newVehicle = { model, color, year, power, bodyType, wheelCount };
    }
    else if (draft !== undefined) {
        newVehicle = { model, color, year, power, draft };
    }
    else if (wingspan !== undefined) {
        newVehicle = { model, color, year, power, wingspan };
    }
    if (newVehicle !== undefined) {
        vehicles.push(newVehicle);
    }
    return res.status(201).json({ message: 'Vehicle added' });
});
//Task4
app.get('vehicle/search/:model', (req, res) => {
    const { model } = req.params;
    const vehicleFound = vehicles.find((vehicle) => vehicle.model === model);
    if (vehicleFound) {
        return res.json(vehicleFound);
    }
    else {
        return res.status(404);
    }
});
app.listen(port, () => {
    console.log("Server is up'n'running at http://localhost:" + port);
});
