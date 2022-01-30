import { ApiClient } from 'adminjs'
import { Box, Text, Table, TableRow, TableCell, TableHead } from '@adminjs/design-system';
import { useEffect, useState } from 'react';

const api = new ApiClient()

const Dashboard = () => {
  const [data, setData] = useState({totalSpent: 0, currentValue: [], lastUpdatedAt: new Date() })

  useEffect(() => {
    // getting the data from adminbro object
    api.getDashboard().then((response) => {
        const { totalSpent, currentValue, lastUpdatedAt } = response.data;
        
        const totalValue = currentValue.reduce((a, b) => +a + (b.value || 0), 0)
        
        const totalProfit = totalValue - totalSpent

        console.log(lastUpdatedAt)
        
        setData({
            currentValue,
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
                            current value
                        </Text>
                    </TableCell>
                    <TableCell>
                        <Text fontSize="15px" fontWeight="900">
                            profit/loss
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
                        {Math.round(current.value)}
                    </TableCell>
                    <TableCell>
                        <Text fontWeight="900" style={{ color: current.profit > 0 ? 'green' : 'red' }}>
                            {Math.round(current.profit)}
                        </Text>
                    </TableCell>
                </TableRow>
            )}
        </Table>
    </div>
  )
}

export default Dashboard