// Users and buses setup
const users = [
    { username: "ticket1", password: "pass123" },  // Array of user objects with username and password
    { username: "ticket2", password: "secure456" }
  ];
  
  const buses = [
    { name: "Cubao", passengers: Array(30).fill("AVAILABLE") },  // Array of buses, each with an array of 30 available seats
    { name: "Baguio", passengers: Array(30).fill("AVAILABLE") },
    { name: "Pasay", passengers: Array(30).fill("AVAILABLE") }
  ];
  
  // Helper functions
  function authenticate(username, password) {
    return users.some(user => user.username === username && user.password === password);  // Checks if username and password match any user
  }
  
  function displayBuses() {
    buses.forEach((bus, index) => {  // Displays all available buses
      console.log(`Bus ${index + 1}: ${bus.name}`);
    });
  }
  
  function displayBusPassengers(busIndex) {
    const bus = buses[busIndex];  // Displays passengers of the chosen bus
    console.log(`Passengers for ${bus.name}:`);
    bus.passengers.forEach((seat, index) => {
      console.log(`Seat ${index + 1}: ${seat}`);
    });
  }
  
  function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {  // Bubble sort algorithm to sort passengers in alphabetical order
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // Swaps elements if they are out of order
        }
      }
    }
    return arr;
  }
  
  // Main program
  function startProgram() {
    const userType = prompt("Are you a TICKET PERSON or CUSTOMER?").toLowerCase();  // Asks user if they are a ticket person or customer
    
    if (userType === "ticket person") {
      ticketPersonFlow();  // Proceeds with ticket person flow
    } else if (userType === "customer") {
      customerFlow();  // Proceeds with customer flow
    } else {
      console.log("Invalid option. Please try again.");  // Handles invalid input
      startProgram();  // Restarts the program
    }
  }
  
  function ticketPersonFlow() {
    const username = prompt("Enter username:");  // Ticket person inputs username
    const password = prompt("Enter password:");  // Ticket person inputs password
  
    if (!authenticate(username, password)) {  // Authenticates the ticket person
      console.log("Authentication failed. Try again.");  // Displays message if authentication fails
      return startProgram();  // Restarts the program
    }
  
    let choice;
    do {
      choice = prompt("Choose: LOGOUT, VIEW, MANAGE").toLowerCase();  // Ticket person chooses an action
      if (choice === "view") {
        const busIndex = parseInt(prompt("Choose a Bus (1, 2, 3):")) - 1;  // Views passengers for a chosen bus
        if (busIndex >= 0 && busIndex < buses.length) {
          displayBusPassengers(busIndex);
        } else {
          console.log("Invalid bus choice.");  // Handles invalid bus choice
        }
      } else if (choice === "manage") {
        const busIndex = parseInt(prompt("Choose a Bus to MANAGE (1, 2, 3):")) - 1;  // Manages passengers for a chosen bus
        if (busIndex >= 0 && busIndex < buses.length) {
          manageBus(busIndex);
        } else {
          console.log("Invalid bus choice.");  // Handles invalid bus choice
        }
      }
    } while (choice !== "logout");
  
    startProgram();  // Logs out and restarts the program
  }
  
  function manageBus(busIndex) {
    const bus = buses[busIndex];  // Manages specific bus
    let manageChoice;
    do {
      manageChoice = prompt("Choose: ADD, REMOVE, CANCEL").toLowerCase();  // Manages seats by adding, removing, or canceling
      if (manageChoice === "add") {
        const seatNumber = parseInt(prompt("Enter Seat Number to ADD (1-30):")) - 1;  // Adds a customer to a seat
        if (seatNumber >= 0 && seatNumber < 30 && bus.passengers[seatNumber] === "AVAILABLE") {
          const customerName = prompt("Enter Customer Name:");  // Adds customer name to seat
          bus.passengers[seatNumber] = customerName;
          console.log(`Seat ${seatNumber + 1} reserved for ${customerName}.`);  // Confirms reservation
        } else {
          console.log("Seat not available.");  // Handles unavailable seats
        }
      } else if (manageChoice === "remove") {
        const seatNumber = parseInt(prompt("Enter Seat Number to REMOVE (1-30):")) - 1;  // Removes customer from a seat
        if (seatNumber >= 0 && seatNumber < 30 && bus.passengers[seatNumber] !== "AVAILABLE") {
          bus.passengers[seatNumber] = "AVAILABLE";
          console.log(`Reservation removed from Seat ${seatNumber + 1}.`);  // Confirms removal
        } else {
          console.log("Seat is already available.");  // Handles already available seats
        }
      }
    } while (manageChoice !== "cancel");
  }
  
  function customerFlow() {
    displayBuses();  // Displays available buses
  
    const customerChoice = prompt("Choose: RESERVE, CANCEL RESERVATION, EXIT").toLowerCase();  // Customer chooses an action
    if (customerChoice === "reserve") {
      const busIndex = parseInt(prompt("Choose a Bus (1, 2, 3):")) - 1;  // Reserves a seat for a chosen bus
      if (busIndex >= 0 && busIndex < buses.length) {
        const bus = buses[busIndex];
        const seatNumber = parseInt(prompt("Choose an AVAILABLE Seat (1-30):")) - 1;  // Chooses an available seat
        if (seatNumber >= 0 && seatNumber < 30 && bus.passengers[seatNumber] === "AVAILABLE") {
          const customerName = prompt("Enter your name:");  // Adds customer name to seat
          bus.passengers[seatNumber] = customerName;
          console.log(`Reservation confirmed for Seat ${seatNumber + 1}.`);  // Confirms reservation
        } else {
          console.log("Seat not available.");  // Handles unavailable seats
        }
      } else {
        console.log("Invalid bus choice.");  // Handles invalid bus choice
      }
    } else if (customerChoice === "cancel reservation") {
      const busIndex = parseInt(prompt("Choose a Bus (1, 2, 3):")) - 1;  // Cancels reservation for a chosen bus
      if (busIndex >= 0 && busIndex < buses.length) {
        const bus = buses[busIndex];
        const customerName = prompt("Enter your name:");  // Removes customer reservation
        const seatIndex = bus.passengers.indexOf(customerName);
        if (seatIndex !== -1) {
          bus.passengers[seatIndex] = "AVAILABLE";
          console.log("Reservation canceled.");  // Confirms cancellation
        } else {
          console.log("No reservation found under this name.");  // Handles no reservation found
        }
      } else {
        console.log("Invalid bus choice.");  // Handles invalid bus choice
      }
    }
  
    startProgram();  // Restarts the program
  }
  
  // Start the program
  startProgram();
  