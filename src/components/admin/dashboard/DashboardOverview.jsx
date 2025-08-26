import formatRevenue from "../../../utils/formartRevenue"


const DashboardOverview = ({ title, amount, icon, bgColor ,revenue = false}) => {
  
  return (
    <div
      className={`flex items-center p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition text-white ${bgColor}`}
    >
      <div className="mr-4 p-4 rounded-xl bg-opacity-20">
        {icon}
      </div>
      <div>
        <p className="text-sm sm:text-base md:text-lg font-medium opacity-90">
          {title}
        </p>
        <p className="text-xl md:text-xl lg:text-3xl font-semibold">
          {revenue ? formatRevenue(amount) : 0 }
        </p>
      </div>
    </div>
  )
}

export default DashboardOverview
