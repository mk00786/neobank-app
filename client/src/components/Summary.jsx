import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const Summary = () => {
    const [loading,setLoading]=useState(false);
    const [summary,setSummary]=useState(null);

    useEffect(()=>{
        const fetchSumary=async ()=>{
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

        fetchSumary();
    },[]);

    if(loading){
        return(
            <div className='flex justify-center items-center h-[70vh]'>
                <Loader2 className='animate-spin w-8 h-8 text-blue-600'/>
            </div>
        )
    }

    if(!summary) return null;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="bg-white shadow-md rounded-xl p-4">
    <h2 className="text-lg font-semibold">Total Balance</h2>
    <p className="text-xl mt-2">{summary.totalBalance}</p>
  </div>
  <div className="bg-white shadow-md rounded-xl p-4">
    <h2 className="text-lg font-semibold">Monthly Spending</h2>
    <p className="text-xl mt-2">{summary.monthlySpending}</p>
  </div>
  <div className="bg-white shadow-md rounded-xl p-4">
    <h2 className="text-lg font-semibold">Transactions</h2>
    <p className="text-xl mt-2">{summary.transactions}</p>
  </div>
  <div className="bg-white shadow-md rounded-xl p-4">
    <h2 className="text-lg font-semibold">Upcoming Payments</h2>
    <p className="text-xl mt-2">{summary.upcomingPayments}</p>
  </div>
</div>
  )
}

export default Summary
