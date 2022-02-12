import { ApiClient } from 'adminjs'
import { Box, Text, Table, TableRow, TableCell, TableHead } from '@adminjs/design-system';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const api = new ApiClient()

const Dashboard = () => {
  const [data, setData] = useState({totalSpent: 0, currentValue: [], lastUpdatedAt: new Date() })

  useEffect(() => {
    // getting the data from adminbro object
    api.getDashboard().then((response) => {
        const { totalSpent, currentValue, lastUpdatedAt, currentPlatforms } = response.data;
        
        const totalValue = currentValue.reduce((a, b) => +a + (b.value || 0), 0)
        
        const totalProfit = totalValue - totalSpent

        const currentPlatformsPieData = {
            labels: currentPlatforms.map(platform => platform._id),
            datasets: [
                {
                    label: '% per platform',
                    data: currentPlatforms.map(platform => platform.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      options: {  
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                }
            ]
        }

        const currentValuePieData = {
            labels: currentValue.map(ticker => ticker.ticker),
            datasets: [
                {
                    label: '% per platform',
                    data: currentValue.map(ticker => ticker.todayValue),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      options: {  
                        responsive: true,
                        maintainAspectRatio: false
                    }
                }
            ]
        }
        
        setData({
            currentValue,
            currentPlatformsPieData,
            currentValuePieData,
            lastUpdatedAt: new Date(lastUpdatedAt.date),
            totalSpent: Math.round(totalSpent),
            totalValue: Math.round(totalValue),
            totalProfit: Math.round(totalProfit),
        })
    })
  }, [])

  return (
    <div>
        <Box flex flexDirection="row" variant="grey">
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text fontSize="25px" fontWeight="900" marginTop="15px" textAlign="center">
                    {new Date().toLocaleDateString('en-GB')}
                </Text>
                <Text textAlign="center">
                    last updated: {data.lastUpdatedAt.toLocaleDateString('en-GB')}
                </Text>
            </Box>
        </Box>
       
        <Box flex flexDirection="row" variant="grey">
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text textAlign="center">
                total spent (EUR)
                </Text>
                <Text fontSize="25px" fontWeight="900" marginTop="15px" textAlign="center">
                    {data.totalSpent}
                </Text>
            </Box>
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text textAlign="center">
                    current value (EUR)
                </Text>
                <Text fontSize="25px" fontWeight="900" marginTop="15px" textAlign="center" style={{ color: data.totalProfit > 0 ? 'green' : 'red' }}>    
                    {data.totalValue}
                </Text>    
            </Box>
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text textAlign="center">
                    profit (EUR)
                </Text>
                <Text fontSize="25px" fontWeight="900" marginTop="15px" textAlign="center" style={{ color: data.totalProfit > 0 ? 'green' : 'red' }}>
                    {data.totalValue - data.totalSpent}
                </Text>
            </Box>
        </Box>

        <Box flex flexDirection="row" variant="grey">
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text textAlign="center" marginBottom="15px" fontSize="25px" fontWeight="900">Breakdown by Platform</Text>
                {data.currentPlatformsPieData && <Pie options={{plugins: {legend: {display: false}}}} data={data.currentPlatformsPieData} />}
            </Box>
            <Box flexGrow="1" flexBasis="0" variant="white" margin="5px">
                <Text textAlign="center" marginBottom="15px" fontSize="25px" fontWeight="900">Breakdown by Ticker</Text>
                {data.currentValuePieData && <Pie options={{plugins: {legend: {display: false}}}} data={data.currentValuePieData} />}
            </Box>
        </Box>
        
        <Table style={{backgroundColor: "white"}}>
            <TableHead style={{backgroundColor: "white"}}>
                <TableRow>
                    <TableCell>
                        <Text fontSize="15px" fontWeight="900">
                            ticker
                        </Text>
                    </TableCell>
                    <TableCell>
                        <Text fontSize="15px" fontWeight="900">
                        quantity
                        </Text>
                    </TableCell>
                    <TableCell>
                        <Text fontSize="15px" fontWeight="900">
                            today value (yesterday value)
                        </Text>
                    </TableCell>
                    <TableCell>
                        <Text fontSize="15px" fontWeight="900">
                            profit/loss (yesterday profit/loss ~ percentage)
                        </Text>
                    </TableCell>
                </TableRow>
            </TableHead>
            {data.currentValue.map(current => 
                <TableRow>
                    <TableCell>
                        {current.ticker}
                    </TableCell>
                    <TableCell>
                        {current.purchase}
                    </TableCell>
                    <TableCell>
                        <div style={{display: 'flex'}}>
                            <Text>{Math.round(current.todayValue)}</Text>
                            &nbsp;
                            <Text>({Math.round(current.yesterdayValue)})</Text>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div style={{display: 'flex'}}>
                            <Text fontWeight="900" style={{ color: current.todayProfit > 0 ? 'green' : 'red' }}>
                                {Math.round(current.todayProfit)}
                            </Text>
                            &nbsp;
                            <Text fontWeight="900" style={{ color: current.todayProfit - current.yesterdayProfit > 0 ? 'green' : 'red' }}>
                                ({Math.round(current.yesterdayProfit)} ~ {Math.round(((current.todayProfit*100) / current.yesterdayProfit) - 100)}%) 
                            </Text>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </Table>
    </div>
  )
}

export default Dashboard