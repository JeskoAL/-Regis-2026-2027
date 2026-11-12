import { useState, useEffect } from 'react';
import { getTable, saveTable, getCurrentUser } from '../utils/storage';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [plateNumber, setPlateNumber] = useState('');
  const [selectedSpotId, setSelectedSpotId] = useState('');
  const currentUser = getCurrentUser();

  const loadData = () => {
    setSpots(getTable('SPOTS'));
    setTickets(getTable('TICKETS'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCheckIn = (e) => {
    e.preventDefault();
    if (!plateNumber || !selectedSpotId) return;

    const spot = spots.find((s) => s.id === selectedSpotId);
    if (!spot || spot.status === 'Occupied') return;

    const newTicket = {
      id: Date.now().toString(),
      plateNumber: plateNumber.toUpperCase(),
      spotId: spot.id,
      slotNumber: spot.slotNumber,
      attendantId: currentUser.id,
      attendantName: currentUser.name,
      timeIn: new Date().toLocaleTimeString(),
      timeOut: '-',
      fee: 0,
      status: 'Active',
    };

    const updatedSpots = spots.map((s) =>
      s.id === spot.id ? { ...s, status: 'Occupied' } : s
    );

    saveTable('TICKETS', [newTicket, ...tickets]);
    saveTable('SPOTS', updatedSpots);

    setPlateNumber('');
    setSelectedSpotId('');
    loadData();
  };

  const handleCheckOut = (ticket) => {
    const spot = spots.find((s) => s.id === ticket.spotId);
    const fee = spot ? Number(spot.hourlyRate) : 50; 

    const updatedTickets = tickets.map((t) =>
      t.id === ticket.id
        ? { ...t, timeOut: new Date().toLocaleTimeString(), fee, status: 'Completed' }
        : t
    );

    const updatedSpots = spots.map((s) =>
      s.id === ticket.spotId ? { ...s, status: 'Available' } : s
    );

    saveTable('TICKETS', updatedTickets);
    saveTable('SPOTS', updatedSpots);
    loadData();
  };

  const availableSpots = spots.filter((s) => s.status === 'Available');
  const activeTickets = tickets.filter((t) => t.status === 'Active');
  const totalRevenue = tickets
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-emerald-500">
          <p className="text-sm text-slate-500">Available Slots</p>
          <p className="text-2xl font-bold">{availableSpots.length} / {spots.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-amber-500">
          <p className="text-sm text-slate-500">Active Parked Vehicles</p>
          <p className="text-2xl font-bold">{activeTickets.length}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-sm text-slate-500">Total Collected Revenue</p>
          <p className="text-2xl font-bold">₱{totalRevenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-lg font-bold mb-4">Vehicle Check-In</h2>
          <form onSubmit={handleCheckIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Plate Number</label>
              <input
                type="text"
                required
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="ABC 1234"
                className="w-full border border-slate-300 rounded px-3 py-2 uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Available Slot</label>
              <select
                required
                value={selectedSpotId}
                onChange={(e) => setSelectedSpotId(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2"
              >
                <option value="">-- Choose a Slot --</option>
                {availableSpots.map((spot) => (
                  <option key={spot.id} value={spot.id}>
                    {spot.slotNumber} ({spot.type} - ₱{spot.hourlyRate}/hr)
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition cursor-pointer"
            >
              Park Vehicle
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Live Parking Lot Status</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {spots.map((spot) => {
              const isAvailable = spot.status === 'Available';
              return (
                <div
                  key={spot.id}
                  className={`p-4 rounded-lg border-2 text-center ${
                    isAvailable
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                      : 'border-rose-500 bg-rose-50 text-rose-900'
                  }`}
                >
                  <p className="text-lg font-bold">{spot.slotNumber}</p>
                  <p className="text-xs opacity-75">{spot.type} • ₱{spot.hourlyRate}/hr</p>
                  <span
                    className={`inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded ${
                      isAvailable ? 'bg-emerald-200' : 'bg-rose-200'
                    }`}
                  >
                    {spot.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Currently Parked Vehicles</h2>
        {activeTickets.length === 0 ? (
          <p className="text-sm text-slate-500">No vehicles currently parked.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Plate Number</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Time In</th>
                  <th className="p-3">Attendant</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b">
                    <td className="p-3 font-bold">{ticket.plateNumber}</td>
                    <td className="p-3">{ticket.slotNumber}</td>
                    <td className="p-3">{ticket.timeIn}</td>
                    <td className="p-3">{ticket.attendantName}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleCheckOut(ticket)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-xs font-medium cursor-pointer"
                      >
                        Check Out & Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
