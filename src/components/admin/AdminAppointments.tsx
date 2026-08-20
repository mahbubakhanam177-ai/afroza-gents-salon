import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  CheckCheck,
  Eye,
  Scissors
} from 'lucide-react';
import { AppointmentRecord, AppointmentStatus } from '../../types';
import { useSalon } from '../../context/SalonContext';

export const AdminAppointments: React.FC = () => {
  const { config, appointments, updateAppointmentStatus, deleteAppointment } = useSalon();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | AppointmentStatus>('All');
  const [selectedApt, setSelectedApt] = useState<AppointmentRecord | null>(null);

  // Filtered Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400';
      case 'Pending':
        return 'bg-amber-950/80 border-amber-500/40 text-amber-400';
      case 'Completed':
        return 'bg-stone-800 border-stone-700 text-stone-300';
      case 'Cancelled':
        return 'bg-rose-950/80 border-rose-500/40 text-rose-400';
      default:
        return 'bg-stone-800 border-stone-700 text-stone-300';
    }
  };

  const generateWhatsappUrl = (apt: AppointmentRecord) => {
    const cleanPhone = apt.phone.replace(/[^0-9]/g, '');
    const msg = `Hello ${apt.customerName}, this is ${config.salonName}. Your appointment request for ${apt.serviceName} on ${apt.preferredDate} at ${apt.preferredTime} has been confirmed.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-100">
            Appointments & Booking Requests
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Manage incoming customer appointment requests for {config.salonName}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-400">
          <span className="bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            Total Requests: <strong className="text-amber-400">{appointments.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-stone-900 p-1.5 rounded-xl border border-stone-800 overflow-x-auto">
          {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap
                ${statusFilter === st 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'text-stone-400 hover:text-stone-100'
                }
              `}
            >
              {st} {st !== 'All' && `(${appointments.filter(a => a.status === st).length})`}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search name or phone..."
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Appointment Table (Desktop) / Cards (Mobile) */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-stone-900 rounded-2xl border border-stone-800 p-12 text-center text-stone-400 text-sm">
          No appointments found matching your current filter or search criteria.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-stone-950/50">
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Service Requested</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 text-xs">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-stone-800/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-bold text-stone-100 block">{apt.customerName}</span>
                      {apt.email && <span className="text-[10px] text-stone-400">{apt.email}</span>}
                    </td>

                    <td className="py-4 px-4 font-mono text-stone-300">
                      {apt.phone}
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-amber-400 font-semibold">{apt.serviceName}</span>
                    </td>

                    <td className="py-4 px-4 text-stone-300">
                      <div className="font-semibold text-stone-200">{apt.preferredDate}</div>
                      <div className="text-[11px] text-stone-400">{apt.preferredTime}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApt(apt)}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-medium text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        {apt.status === 'Pending' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                            className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/40"
                            title="Confirm"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="p-1.5 rounded-lg bg-blue-950 text-blue-400 hover:bg-blue-900 border border-blue-500/40"
                            title="Mark Completed"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </button>
                        )}

                        {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                            className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-500/40"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden space-y-3">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-stone-100 text-sm">{apt.customerName}</h3>
                    <p className="text-xs text-amber-400 font-mono mt-0.5">{apt.phone}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="text-stone-400">Service:</span>
                    <span className="font-bold text-stone-100">{apt.serviceName}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="text-stone-400">Date & Time:</span>
                    <span className="font-medium text-amber-400">{apt.preferredDate} @ {apt.preferredTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1 border-t border-stone-800">
                  <button
                    onClick={() => setSelectedApt(apt)}
                    className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  {apt.status === 'Pending' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                      className="px-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Appointment Detail Modal */}
      {selectedApt && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Appointment ID: {selectedApt.id}</span>
                <h3 className="font-heading font-bold text-stone-100 text-xl mt-0.5">
                  Customer Booking Request
                </h3>
              </div>
              <button
                onClick={() => setSelectedApt(null)}
                className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Info Grid */}
            <div className="space-y-4 text-xs">
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-stone-400 uppercase text-[10px] font-bold">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadgeClass(selectedApt.status)}`}>
                    {selectedApt.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-800/80 space-y-1">
                  <div className="text-sm font-bold text-stone-100">{selectedApt.customerName}</div>
                  <div className="text-amber-400 font-mono text-xs flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>{selectedApt.phone}</span>
                  </div>
                  {selectedApt.email && (
                    <div className="text-stone-300 text-xs flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{selectedApt.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block mb-1">Selected Service</span>
                  <span className="text-amber-400 font-bold text-sm block">{selectedApt.serviceName}</span>
                </div>

                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block mb-1">Date & Time</span>
                  <span className="text-stone-100 font-bold block">{selectedApt.preferredDate}</span>
                  <span className="text-stone-300 block mt-0.5">{selectedApt.preferredTime}</span>
                </div>
              </div>

              {selectedApt.specialRequest && (
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block mb-1">Customer Message / Notes</span>
                  <p className="text-stone-200 leading-relaxed">{selectedApt.specialRequest}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <a
                href={generateWhatsappUrl(selectedApt)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Confirmation Message</span>
              </a>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => {
                    updateAppointmentStatus(selectedApt.id, 'Confirmed');
                    setSelectedApt({ ...selectedApt, status: 'Confirmed' });
                  }}
                  className="bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 rounded-xl text-[11px] uppercase"
                >
                  Confirm
                </button>

                <button
                  onClick={() => {
                    updateAppointmentStatus(selectedApt.id, 'Completed');
                    setSelectedApt({ ...selectedApt, status: 'Completed' });
                  }}
                  className="bg-stone-800 hover:bg-stone-700 text-blue-400 border border-blue-500/30 font-bold py-2.5 rounded-xl text-[11px] uppercase"
                >
                  Completed
                </button>

                <button
                  onClick={() => {
                    updateAppointmentStatus(selectedApt.id, 'Cancelled');
                    setSelectedApt({ ...selectedApt, status: 'Cancelled' });
                  }}
                  className="bg-stone-800 hover:bg-stone-700 text-rose-400 border border-rose-500/30 font-bold py-2.5 rounded-xl text-[11px] uppercase"
                >
                  Cancel
                </button>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this record?")) {
                      deleteAppointment(selectedApt.id);
                      setSelectedApt(null);
                    }
                  }}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Record</span>
                </button>

                <button
                  onClick={() => setSelectedApt(null)}
                  className="text-xs text-stone-400 hover:text-stone-100 font-semibold"
                >
                  Close Modal
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
