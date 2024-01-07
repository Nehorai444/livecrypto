import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = (props) => {
    const { data, setFlag } = props;

    // Assuming data is an array of objects with eventTimestamp and currentPrice properties
    const formattedData = data.map((entry) => ({
        time: new Date(entry.eventTimestamp).toLocaleTimeString(),
        price: entry.currentPrice,
    }));

    function onClick() {
        setFlag(false);
    }
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 20, bottom: 5 }}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <button onClick={onClick} className="hide-button">
                Hide
            </button>
        </div>
    );
};

export default Graph;
