import { ApiClient } from 'adminjs'
import { useEffect, useState } from 'react';

const api = new ApiClient()

const Dashboard = () => {
  const [data, setData] = useState({totalSpent: 0, currentValue: []})

  useEffect(() => {
    // getting the data from adminbro object
    api.getDashboard().then((response) => {
        const { totalSpent, currentValue } = response.data;
        
        const totalValue = currentValue.reduce((a, b) => +a + +b.price, 0)
        console.log(currentValue)
        
        setData({totalSpent, currentValue, totalValue})
    })
  }, [])

  return (
   <div>
       <div>
       total spent EUR {data.totalSpent}
       </div>
        <div>
       current value EUR {data.totalValue}
       </div>
       {data.currentValue.map(current => 
           <div>{current.ticker} ~ {current.purchase} ~ {current.value} ~ {current.profit}</div>
       )}
   </div>
  )
}

export default Dashboard