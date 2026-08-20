import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Scissors, 
  Tag, 
  Plus, 
  Image as ImageIcon, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { AdminRoute, AppointmentRecord, AppointmentStatus } from '../../types';
import { useSalon } from '../../context/SalonContext';

interface AdminDashboardProps {
  onNavigate: (route: AdminRoute) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { config, appointments, services, offers, updateAppointmentStatus } = useSalon();
  const [selectedApt, setSelectedApt] = useState<AppointmentRecord | null>(null);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const formattedTodayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Main Card Metrics
  const todaysAppointmentsCount = appointments.filter(a => a.preferredDate === todayStr).length;
  const pendingRequestsCount = appointments.filter(a => a.status === 'Pending').length;
  const activeServicesCount = services.filter(s => s.isActive !== false).length;
  const activeOffersCount = offers.filter(o => o.isActive !== false).length;

  // Today's appointments list
  const todaysAppointments = appointments.filter(a => a.preferredDate === todayStr);
  const displayAppointments = todaysAppointments.length > 0 ? todaysAppointments : appointments.slice(0, 5);

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

  return (
    <div className="space-y-8">
      
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-100">
            {getGreeting()}, Salon Owner
          </h1>
          <p className="text-stone-300 text-sm mt-1">
            Here's what's happening at <strong className="text-stone-100">{config.salonName}</strong> today.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-amber-400 font-semibold self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{formattedTodayDate}</span>
        </div>
      </div>

      {/* 4 Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today's Appointments */}
        <div 
          onClick={() => onNavigate('/admin/appointments')}
          className="bg-stone-900 rounded-2xl border border-stone-800 p-5 hover:border-amber-500/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Today's Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-stone-100 font-display">
            {todaysAppointmentsCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Scheduled for today ({todayStr})
          </p>
        </div>

        {/* Card 2: Pending Requests */}
        <div 
          onClick={() => onNavigate('/admin/appointments')}
          className="bg-stone-900 rounded-2xl border border-stone-800 p-5 hover:border-amber-500/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pending Requests</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400 font-display">
            {pendingRequestsCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Requires your confirmation
          </p>
        </div>

        {/* Card 3: Active Services */}
        <div 
          onClick={() => onNavigate('/admin/services')}
          className="bg-stone-900 rounded-2xl border border-stone-800 p-5 hover:border-amber-500/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Active Services</span>
            <div className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Scissors className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-stone-100 font-display">
            {activeServicesCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Displayed on public menu
          </p>
        </div>

        {/* Card 4: Active Offers */}
        <div 
          onClick={() => onNavigate('/admin/offers')}
          className="bg-stone-900 rounded-2xl border border-stone-800 p-5 hover:border-amber-500/40 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Active Offers</span>
            <div className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Tag className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-black text-stone-100 font-display">
            {activeOffersCount}
          </div>
          <p className="text-[11px] text-stone-400 mt-1">
            Current promotional deals
          </p>
        </div>

      </div>

      {/* Quick Action Buttons */}
      <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-4">
        <h3 className="font-heading font-bold text-stone-100 text-sm uppercase tracking-wider">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('/admin/services')}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Service</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/offers')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider border border-stone-700 flex items-center justify-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Create Offer</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/gallery')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider border border-stone-700 flex items-center justify-center gap-2 transition-all"
          >
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Add Photo</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/appointments')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider border border-stone-700 flex items-center justify-center gap-2 transition-all"
          >
            <Calendar className="w-4 h-4 text-stone-300" />
            <span>View All</span>
          </button>
        </div>
      </div>

      {/* Today's Appointments Section */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-heading font-bold text-stone-100 text-lg">
              Today's Appointments
            </h3>
            <p className="text-xs text-stone-400">
              {todaysAppointments.length > 0 
                ? `${todaysAppointments.length} appointment(s) scheduled for today`
                : 'Showing recent customer appointment requests'
              }
            </p>
          </div>

          <button
            onClick={() => onNavigate('/admin/appointments')}
            className="text-xs text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            <span>Manage All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Phone</th>
                <th className="py-3 px-3">Service</th>
                <th className="py-3 px-3">Time</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-xs">
              {displayAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-stone-100">
                    {apt.customerName}
                  </td>
                  <td className="py-3.5 px-3 text-stone-300 font-mono text-[11px]">
                    {apt.phone}
                  </td>
                  <td className="py-3.5 px-3 text-amber-400 font-medium">
                    {apt.serviceName}
                  </td>
                  <td className="py-3.5 px-3 text-stone-300 font-medium">
                    {apt.preferredTime}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedApt(apt)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {apt.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                            className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/40"
                            title="Confirm Appointment"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                            className="p-1.5 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 border border-rose-500/40"
                            title="Cancel Appointment"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Quick View Modal */}
      {selectedApt && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 max-w-md w-full space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-heading font-bold text-stone-100 text-lg">
                Appointment Details
              </h3>
              <button
                onClick={() => setSelectedApt(null)}
                className="text-stone-400 hover:text-stone-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] font-bold">Customer Name</span>
                <p className="text-stone-100 font-bold text-sm">{selectedApt.customerName}</p>
                <p className="text-amber-400 font-mono text-xs">{selectedApt.phone}</p>
                {selectedApt.email && <p className="text-stone-400 text-xs">{selectedApt.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block">Service</span>
                  <span className="text-stone-100 font-medium">{selectedApt.serviceName}</span>
                </div>
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block">Date & Time</span>
                  <span className="text-stone-100 font-medium">{selectedApt.preferredDate} @ {selectedApt.preferredTime}</span>
                </div>
              </div>

              {selectedApt.specialRequest && (
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 uppercase text-[10px] font-bold block">Special Request</span>
                  <p className="text-stone-200">{selectedApt.specialRequest}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {selectedApt.status === 'Pending' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedApt.id, 'Confirmed');
                      setSelectedApt(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs uppercase"
                  >
                    Confirm Appointment
                  </button>
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedApt.id, 'Cancelled');
                      setSelectedApt(null);
                    }}
                    className="bg-rose-950 hover:bg-rose-900 text-rose-300 font-bold py-2.5 rounded-xl text-xs uppercase border border-rose-800"
                  >
                    Cancel Request
                  </button>
                </div>
              )}

              <a
                href={`https://wa.me/${selectedApt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedApt.customerName}, this is ${config.salonName}. Your appointment request for ${selectedApt.serviceName} on ${selectedApt.preferredDate} at ${selectedApt.preferredTime} has been confirmed.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Customer</span>
              </a>

              <button
                onClick={() => setSelectedApt(null)}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold py-2.5 rounded-xl text-xs uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
