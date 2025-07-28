import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const Summary = () => {
    const [loading,setLoading]=useState(false);
    const [summary,setSummary]=useState(null);

    useEffect(()=>{
        const fetchSummary=async ()=>{
            try{
                setLoading(true);

                const data={
                    totalBalance:'₹45000',
                    monthlySpending:'₹12000',
                    transactions:54,
                    upcomingPayments:3
                };

                setTimeout(()=>{
                    setSummary(data);
                    setLoading(false);
                    toast.success('Summary Loaded');
                },1000);

            }catch(error){
                toast.error('Failed to fetch summary');
                setLoading(false);
            }
        };

        fetchSummary();
    },[]);

    if(loading){
        return(
            <div role='status' aria-label='Loading summary' className='flex justify-center items-center h-[70vh]'>
                <Loader2 className='animate-spin w-10 h-10 text-blue-600'/>
            </div>
        )
    }

    if(!summary){
        return (
            <div className='flex justify-center items-center h-[70vh] text-gray-600'>
                <p>No summary data available</p>
            </div>
        )
    }

    const cardData=[
        {title:'Total Balance',value:summary.totalBalance,color:'bg-blue-50 text-blue-700'},
        {title:'Monthly Spending',value:summary.monthlySpending,color:'bg-red-50 text-red-700'},
        {title:'Transactions',value:summary.transactions,color:'bg-yellow-50 text-yellow-700'},
        {title:'Upcoming Payments',value:summary.upcomingPayments,color:'bg-green-50 text-green-700'}
    ];

  return (
    <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cardData.map((card,index)=>(
            <div role='summary-card' key={index} className={`shadow-md rounded-xl p-5 transition-transform hover:scale-[1.02]
                hover:shadow-lg duration-200 ease-in-out ${card.color} bg-opacity-60`}>
                <h2 className='text-sm font-semibold tracking-wide'>{card.title}</h2>
                <p className='text-xl font-bold mt-1'>{card.value}</p>
            </div>
        ))}

    </section>
  )
}

export default Summary
