// src/components/StatCard.jsx
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 border hover:shadow-lg transition-all">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
