import React, { useEffect } from 'react'
import { Package, DollarSign, ShoppingCart } from 'lucide-react'
import DashboardOverview from './DashboardOverview'
import { useDispatch, useSelector } from 'react-redux'
import { analyticsAction } from '../../../store/actions'
import Loader from '../../shared/Loader'
import ErrorPage from '../../shared/ErrorPage'

const AdminDashboard = () => {

  const dispatch = useDispatch();

  const { analytics } = useSelector((state) => state.admin);
  console.log(analytics);

  const { isLoading,errorMessage} = useSelector((state) => state.error);
  useEffect(() => {
    dispatch(analyticsAction());
  },[dispatch]);

  if(isLoading){
    return <Loader />
  }
  if(errorMessage){
    return <ErrorPage message={errorMessage} />
  }

  const stats = [
    {
      title: 'Total Products',
      amount: analytics?.productCount || 0,
      icon: <Package className="w-8 h-8 text-white" />,
      bgColor: 'bg-indigo-600',
    },
    {
      title: 'Total Revenue',
      amount: analytics?.totalRevenue || 0,
      icon: <DollarSign className="w-8 h-8 text-white" />,
      bgColor: 'bg-green-600',
    },
    {
      title: 'Total Orders',
      amount: analytics?.totalOrders || 0,
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
      bgColor: 'bg-yellow-500',
    },
  ]

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <DashboardOverview
            key={index}
            title={stat.title}
            amount={stat.amount}
            icon={stat.icon}
            bgColor={stat.bgColor}
            revenue
          />
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
