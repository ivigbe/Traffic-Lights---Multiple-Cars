class RoadItem {
    constructor(representation, position) {
        this._representation = representation;
        this._position = position;
    }

    getRepresentation() {
        return this._representation;
    }

    setRepresentation(newRepresentation) {
        this._representation = newRepresentation;
    }

    getPosition() {
        return this._position;
    }

    setPosition(newPosition) {
        this._position = newPosition;
    }
}

class Semaphore extends RoadItem {
    constructor(color, position) {
        super(color, position);
        
        this._unitsPassed = 0;
    }

    setRepresentation(color) {
        this._representation = color;
    }

    update() {
        this._unitsPassed++;
        if (this.isSemaphoreOfColorAndHasPassedUnits('G', 5, 0))
            this.setRepresentation('O');
        
        if (this.isSemaphoreOfColorAndHasPassedUnits('R', 5, 0))
            this.setRepresentation('G');
        
        if (this.isSemaphoreOfColorAndHasPassedUnits('O', 5, 1)) {
            this.setRepresentation('R');
            this._unitsPassed = 0;
        }
        
        return this;
    }

    isSemaphoreOfColorAndHasPassedUnits(color, units, divisionRest) {
        return this._representation === color && this._unitsPassed > 1 && this._unitsPassed % units === divisionRest;
    }
}

class Car extends RoadItem {
    constructor(representation, position) {
        super(representation, position);
    }

    update(road) {

        if(this.carIsAtTheEndOfTheRoad(road)) {
            this.moveCar();
            
            return this;
        }

        const nextItem = road[this._position + 1];
        const itemAhead = road[this._position + 2];

        if (this.canMove(nextItem, itemAhead)) {
            this.moveCar();
        }

        return this;
    }

    moveCar() {
        this.setPosition(this._position + 1);
    }

    canMove(nextItem, itemAhead) {
        return (nextItem === 'G' && itemAhead !== 'C') || nextItem === '.';
    }

    carIsAtTheEndOfTheRoad(road) {
        return this._position === (road.length - 1);
    }
}

class TrafficManager {
    constructor(road) {
        this._emptyRoad = this._initializeEmptyRoad(road);
        this._semaphores = this._initializeSemaphores(road);
        this._cars = this._initializeCars(road);
    }

    _initializeEmptyRoad(road) {
        const result = [];
        
        for (let i = 0; i < road.length; i++) {
            result.push('.');
        }

        return result;
    }

    _initializeSemaphores(road) {
        const result = [];
        
        road.forEach((element, i) => {
            if (element === 'G' || element === 'R') {
                result.push(new Semaphore(element, i));
            }
        });

        return result;
    }

    _initializeCars(road) {
        const result = [];
        
        road.forEach((element, i) => {
            if (element === 'C')
                result.push(new Car(element, i));
        });

        const carsFromHighToLowPosition = result.sort((a, b) => b.getPosition() - a.getPosition());

        return carsFromHighToLowPosition;
    }

    processTraffic() {
        // Steps:
        // update semaphores states according to the units passed.
        // put semaphores in the empty road.
        // Update cars states according to the items in the road.
        // print cars in the road.
        // return the new road string.

        const semaphoresUpdated = this.updateSemaphoresState();
        const semaphoresPrinted = this.printSemaphores(semaphoresUpdated);
        const carsPrinted = this.updateCarsState(semaphoresPrinted);

        const completedRoadString = carsPrinted.join('');

        return completedRoadString;
    }

    updateSemaphoresState() {
        return this._semaphores.map((semaphore) => semaphore.update());
    }

    printSemaphores(semaphoresUpdated) {
        const roadWithSemaphores = [...this._emptyRoad];

        semaphoresUpdated.forEach((semaphore) => {
            roadWithSemaphores[semaphore.getPosition()] = semaphore.getRepresentation();
        });

        return roadWithSemaphores;
    }

    updateCarsState(roadWithSemaphores) {
        let printedRoad = [...roadWithSemaphores];
        let updatedCar = null;
        let carsCopy = this.filterCarsOutOfTheRoad(roadWithSemaphores);

        for(let i = 0; i < carsCopy.length; i++) {
            const car = carsCopy[i];
            
            if (i === 0) {
                ({ updatedCar, printedRoad } = this.processCar(updatedCar, car, printedRoad, roadWithSemaphores));
            }
            else {
                ({ updatedCar, printedRoad } = this.processCar(updatedCar, car, printedRoad));
            }
        };

        return printedRoad;
    }

    processCar(updatedCar, car, printedRoad, roadWithSemaphores) {
        updatedCar = (roadWithSemaphores) ? car.update(roadWithSemaphores) : car.update(printedRoad);
        
        printedRoad = (roadWithSemaphores) 
        ? this.printCar(updatedCar, roadWithSemaphores) 
        : this.printCar(updatedCar, printedRoad);
        
        return { updatedCar, printedRoad };
    }

    filterCarsOutOfTheRoad(roadWithSemaphores) {
        return this._cars.filter((car) => car.getPosition() < roadWithSemaphores.length);
    }

    printCar(car, road) {
        const updatedRoad = [...road];

        if (this.isOutOfTheRoad(car, updatedRoad)) {
            return updatedRoad;
        }
        
        updatedRoad[car.getPosition()] = car.getRepresentation();

        return updatedRoad;
    }

    isOutOfTheRoad(car, updatedRoad) {
        return car.getPosition() === (updatedRoad.length);
    }
}

const trafficLights = (road, n) => {
    let result = [road];
    let itemsOfTheRoad = road.split('');
    const manager = new TrafficManager(itemsOfTheRoad);

    for (let i = 0; i < n; i++) {
        const iterationResult = manager.processTraffic();
        result.push(iterationResult);
    }

    return result;
}
