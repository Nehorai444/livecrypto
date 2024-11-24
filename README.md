
---

# LiveCrypto

LiveCrypto is a cryptocurrency tracking and analysis platform that provides users with real-time data on various cryptocurrencies.

## Features

- 🌐 **Real-Time Data**: Fetch and display live cryptocurrency data.  
- 🔍 **Search Functionality**: Search for detailed information about specific coins.  
- 📊 **Interactive UI**: Responsive and user-friendly interface built with React.js.  
- 💾 **Database Integration**: MongoDB backend for secure and efficient data management.  

## Tech Stack

- **Frontend**: React.js, HTML, CSS, Bootstrap  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **API Integration**: Fetch data from external cryptocurrency APIs  
- **Deployment**: DigitalOcean  
- **Containerization**: Docker and Docker Compose  

## Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/Nehorai444/livecrypto.git  
   cd livecrypto  
   ```  
2. Install dependencies:  
   - Backend:  
     ```bash
     cd server  
     npm install  
     ```  
   - Frontend:  
     ```bash
     cd client  
     npm install  
     ```  
3. Set up environment variables:  
   Create a `.env` file in the `server` directory with the following:  
   ```env
   MONGO_URI=mongodb://localhost:27017/trivia  
   PORT=5000  
   API_KEY=your_api_key_here  
   ```  
4. Start the application:  
   - Run Docker Compose (if configured):  
     ```bash
     docker-compose up  
     ```  
   - Alternatively, start the backend and frontend separately:  
     - Backend:  
       ```bash
       cd server  
       npm start  
       ```  
     - Frontend:  
       ```bash
       cd client  
       npm start  
       ```  

## API Endpoints

- **Search Coin Data**:  
  `GET /api/searchCoinData`  
  Example request: `http://localhost:8000/api/searchCoinData?query=bitcoin`  

- Add more endpoints as required...  

## Development

- **Code Structure**:  
  - `server/`: Backend code (Node.js, Express.js)  
  - `client/`: Frontend code (React.js)  
  - `docker-compose.yml`: Docker configuration  

- **Database Configuration**:  
  - MongoDB running at `mongodb://localhost:27017/trivia`  
  - Default credentials:  
    - Username: `root`  
    - Password: `5wCw23dp4TWgIyyM`  

## Contributing

1. Fork the repository.  
2. Create a new branch:  
   ```bash
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Description of your feature"  
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature-name  
   ```  
5. Submit a pull request.  

## License

This project is licensed under the [MIT License](LICENSE).  

## Acknowledgments

- Cryptocurrency data source: Binance WebSocket API
- Special thanks to all contributors.  

---

**LiveCrypto**: Your one-stop solution for tracking cryptocurrency trends.

---
