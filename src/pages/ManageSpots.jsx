import { useState, useEffect } from 'react';
import { getTable, saveTable } from '../utils/storage';

export default function ManageSpots() {
  const [spots, setSpots] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [slotNumber, setSlotNumber] = useState('');
  const [zone, setZone] = useState('Zone A');
  const [type, setType] = useState('Regular');
  const [hourlyRate, setHourlyRate] = useState(50);

  const loadData = () => {
    setSpots(getTable('SPOTS'));
    setTickets(getTable('TICKETS'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSpot = (e) => {
    e.preventDefault();
    if (!slotNumber) return;

    if (editingId) {
      const updated = spots.map((s) =>
        s.id === editingId
          ? { ...s, slotNumber: slotNumber.toUpperCase(), zone, type, hourlyRate: Number(hourlyRate) }
          : s
      );
      saveTable('SPOTS', updated);
      setEditingId(null);
    } else {
      const newSpot = {
        id: Date.now().toString(),
        slotNumber: slotNumber.toUpperCase(),
        zone,
        type,
        hourlyRate: Number(hourlyRate),
        status: 'Available',
      };
      saveTable('SPOTS', [...spots, newSpot]);
    }

    setSlotNumber('');
    setZone('Zone A');
    setType('Regular');
    setHourlyRate(50);
    loadData();
  };

  const handleEditClick = (spot) => {
    setEditingId(spot.id);
    setSlotNumber(spot.slotNumber);
    setZone(spot.zone);
    setType(spot.type);
    setHourlyRate(spot.hourlyRate);
  };

  const handleDeleteSpot = (spot) => {
    if (spot.status === 'Occupied') {
      alert('Cannot delete an occupied spot!');
      return;
    }
    const filtered = spots.filter((s) => s.id !== spot.id);
    saveTable('SPOTS', filtered);
    loadData();
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">
          {editingId ? 'Edit Parking Slot' : 'Add New Parking Slot'}
        </h2>
        <form onSubmit={handleSaveSpot} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium mb-1">Slot Code</label>
            <input
              type="text"
              required
              value={slotNumber}
              onChange={(e) => setSlotNumber(e.target.value)}
              placeholder="C-01"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm uppercase"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Zone</label>
            <input
              type="text"
              required
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Vehicle Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            >
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
              <option value="Motorcycle">Motorcycle</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Rate (₱/hr)</label>
            <input
              type="number"
              required
              min="10"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded text-sm cursor-pointer"
            >
              {editingId ? 'Update' : 'Add Slot'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setSlotNumber('');
                }}
                className="bg-slate-300 hover:bg-slate-400 text-slate-800 py-2 px-3 rounded text-sm cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Parking Slots Directory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-3">Slot</th>
                <th className="p-3">Zone</th>
                <th className="p-3">Type</th>
                <th className="p-3">Rate</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spots.map((spot) => (
                <tr key={spot.id} className="border-b">
                  <td className="p-3 font-bold">{spot.slotNumber}</td>
                  <td className="p-3">{spot.zone}</td>
                  <td className="p-3">{spot.type}</td>
                  <td className="p-3">₱{spot.hourlyRate}/hr</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        spot.status === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {spot.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(spot)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1 rounded text-xs cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSpot(spot)}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-2.5 py-1 rounded text-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">All Parking Transaction Logs</h2>
        {tickets.length === 0 ? (
          <p className="text-sm text-slate-500">No parking transactions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Plate</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Time In</th>
                  <th className="p-3">Time Out</th>
                  <th className="p-3">Fee</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b">
                    <td className="p-3 font-bold">{t.plateNumber}</td>
                    <td className="p-3">{t.slotNumber}</td>
                    <td className="p-3">{t.timeIn}</td>
                    <td className="p-3">{t.timeOut}</td>
                    <td className="p-3 font-semibold">₱{t.fee}</td>
                    <td className="p-3">{t.status}</td>
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
