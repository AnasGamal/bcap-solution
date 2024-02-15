import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const coworkers = [
  { name: 'Bob', favoriteDrink: 'Cappuccino', drinkCost: 3.5 },
  { name: 'Jeremy', favoriteDrink: 'Black Coffee', drinkCost: 2.5 },
  { name: 'Alice', favoriteDrink: 'Latte', drinkCost: 4.0 },
  { name: 'Emily', favoriteDrink: 'Espresso', drinkCost: 3.0 },
  { name: 'John', favoriteDrink: 'Mocha', drinkCost: 4.5 },
  { name: 'Sarah', favoriteDrink: 'Iced Coffee', drinkCost: 3.75 },
  { name: 'Michael', favoriteDrink: 'Chai Tea', drinkCost: 3.25 },
];

const App = () => {
  const [currentPayerIndex, setCurrentPayerIndex] = useState(0);
  const [payerHistory, setPayerHistory] = useState([]);
  const [db, setDb] = useState([]);
  const [simulatedDate, setSimulatedDate] = useState(null); // Add simulatedDate state
  const [availableCoworkers, setAvailableCoworkers] = useState(coworkers);
  const [currentPayer, setCurrentPayer] = useState(coworkers[currentPayerIndex]);
  // return simulated date if it exists, otherwise return today's date
  const getDate = () => {
    return simulatedDate ? new Date(simulatedDate) : new Date();
  };
  useEffect(() => {
    const availableCoworkers = coworkers.filter(coworker => !payerHistory.some(payer => payer.indexNumber === coworkers.indexOf(coworker)));
    setAvailableCoworkers(availableCoworkers);
  }
  
  , [payerHistory, simulatedDate]);

  useEffect(() => {
    if (payerHistory.length === coworkers.length) {
      setDb([...db, ...payerHistory ]);
      setPayerHistory([]);
    }

  }, [payerHistory, db]);
  const handleNextPayer = () => {
    const randomIndex = Math.floor(Math.random() * (availableCoworkers.length - 1));
    setCurrentPayerIndex(coworkers.indexOf(availableCoworkers[randomIndex]));
    const currentPayer = coworkers[coworkers.indexOf(availableCoworkers[randomIndex])];
    setCurrentPayer(currentPayer);
    // set simulated to date to next business day
    const nextBusinessDay = new Date(getDate());
    nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
    while (!isBusinessDay(nextBusinessDay)) {
      nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
    }
    setSimulatedDate(dayjs(nextBusinessDay));
    const newPayer = { indexNumber: coworkers.indexOf(availableCoworkers[randomIndex]), date: getDate().toDateString() };
    setPayerHistory([...payerHistory, newPayer]);
    // remove the current payer from the available coworkers
    setAvailableCoworkers(availableCoworkers.filter(coworker => coworker !== currentPayer))
  };

  const handleSimulatedDateChange = (date) => {
    // make sure date is not null and that it has day, month and year values
    const formattedDate = date ? new Date(date) : null;
    const dateIsValid = formattedDate && formattedDate.getDate() && formattedDate.getMonth() && formattedDate.getFullYear();
      if (formattedDate && dateIsValid) {
        setSimulatedDate(date);
      } else if (formattedDate && !dateIsValid) {
        setSimulatedDate(null);
      }

  };

  const totalPayment = coworkers.reduce((sum, coworker) => sum + coworker.drinkCost, 0);

  const isBusinessDay = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday
  };
  
  const isTodayBusinessDay = isBusinessDay(getDate());

  const payerForToday = payerHistory.find(payer => {
    const payerDate = getDate().toDateString();
    return payer.date === payerDate;
  }
  );

  const weekStartDate = new Date(getDate());
  weekStartDate.setDate(getDate().getDate() - getDate().getDay() + (getDate().getDay() === 0 ? -6 : 1)); // Set to Monday of the current week

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 4); // Set to Friday of the current week

  const displayWeek = `${weekStartDate.getMonth() + 1}/${weekStartDate.getDate()}-${weekEndDate.getMonth() + 1}/${weekEndDate.getDate()}`;


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#f2f2f2' 
      }}>
        <Box sx={{ 
          flex: '1',
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
          marginTop: '50px', 
          marginBottom: '20px' 
        }}>          <Typography variant="h4" sx={{ marginBottom: '20px' }}>Coffee Payment App</Typography>          
          
          { payerForToday && (<>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>Today's Payer: {coworkers[payerForToday.indexNumber].name}</Typography>
            </>
          )}
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Today's Date: {getDate().toDateString()}</Typography>

          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Week: {displayWeek}</Typography>

          { currentPayer && (
            <>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>Next in line: {currentPayer.name}</Typography>
            </>
          )
          }

          { isTodayBusinessDay && (
             <Typography variant="h6" sx={{ marginBottom: '20px' }}>Total Payment: ${totalPayment}</Typography>
          )}
             { !isTodayBusinessDay ? (
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>Today is not a business day</Typography>
          ) :
          payerHistory.filter(payer => {
            const payerDate = simulatedDate ? new Date(simulatedDate).toDateString() : new Date().toDateString();
            return payer.date === payerDate;
          }).length > 0 ? (
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>{payerForToday.name || currentPayer.name} have already paid today</Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNextPayer}>
              Next
            </Button>
          )}


        </Box>
        <Box sx={{ 
          textAlign: 'center', 
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '8px', 
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
          marginLeft: '20px', 
          marginBottom: '20px'
        }}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Simulate a different date (for testing purposes only)</Typography>
          <DatePicker
            label="Simulated Date"
            value={simulatedDate}
            onChange={handleSimulatedDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default App;
