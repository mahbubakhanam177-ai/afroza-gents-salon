import React, { useState } from 'react';
import { 
  Plus, 
  Scissors, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ServiceItem, ServiceCategory, ServiceTier } from '../../types';
import { useSalon } from '../../context/SalonContext';

export const AdminServices: React.FC = () => {
  const { config, services, addService, updateService, deleteService } = useSalon();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    category: ServiceCategory;
    tier: ServiceTier;
    description: string;
    startingPrice: number;
    duration: string;
    image: string;
    popular: boolean;
    isActive: boolean;
  }>({
    name: '',
    category: 'haircuts',
    tier: 'essential',
    description: '',
    startingPrice: 20,
    duration: '25 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
    popular: false,
    isActive: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'haircuts',
      tier: 'essential',
      description: '',
      startingPrice: 20,
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
      popular: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (srv: ServiceItem) => {
    setEditingService(srv);
    setFormData({
      name: srv.name,
      category: srv.category,
      tier: srv.tier,
      description: srv.description,
      startingPrice: srv.startingPrice,
      duration: srv.duration,
      image: srv.image,
      popular: srv.popular || false,
      isActive: srv.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingService) {
      await updateService({
        ...editingService,
        ...formData
      });
      showToast(`Updated service "${formData.name}". Public website pricing updated!`);
    } else {
      await addService({
        ...formData,
        benefits: ['Professional grooming service', 'Sanitized equipment', 'Comfortable chair care'],
        whatToExpect: 'Barber consultation, service execution, clean finish.',
        preparation: 'None required.',
        aftercare: 'Daily maintenance.'
      });
      showToast(`Added new service "${formData.name}".`);
    }

    setModalOpen(false);
  };

  const handleToggleActive = async (srv: ServiceItem) => {
    await updateService({
      ...srv,
      isActive: !srv.isActive
    });
    showToast(`Service "${srv.name}" is now ${!srv.isActive ? 'Active' : 'Inactive'}.`);
  };

  const handleDelete = async (srv: ServiceItem) => {
    if (confirm(`Are you sure you want to delete "${srv.name}"?`)) {
      await deleteService(srv.id);
      showToast(`Deleted "${srv.name}".`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-100">
            Services & Price Management
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Add or edit service prices. Price changes update on the public website automatically.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Add Service</span>
        </button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Services List Table */}
      <div className="bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-300 uppercase tracking-wider">
            All Services ({services.length})
          </span>
          <span className="text-[11px] text-amber-400 font-mono">
            Currency: {config.currency}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-stone-950/50">
                <th className="py-3.5 px-4">Service Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Price ({config.currency})</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 text-xs">
              {services.map((srv) => (
                <tr key={srv.id} className={`hover:bg-stone-800/40 transition-colors ${srv.isActive === false ? 'opacity-60' : ''}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={srv.image}
                        alt={srv.name}
                        className="w-10 h-10 rounded-lg object-cover border border-stone-700 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-stone-100 block">{srv.name}</span>
                        {srv.popular && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 uppercase text-[11px] font-bold text-stone-300">
                    {srv.category}
                  </td>

                  <td className="py-4 px-4 text-stone-300">
                    {srv.duration}
                  </td>

                  <td className="py-4 px-4 font-bold text-amber-400 text-sm font-mono">
                    {srv.startingPrice > 0 ? `${config.currency} ${srv.startingPrice}` : 'Price on request'}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleActive(srv)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                        srv.isActive !== false 
                          ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400' 
                          : 'bg-stone-800 border-stone-700 text-stone-400'
                      }`}
                    >
                      {srv.isActive !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{srv.isActive !== false ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 font-bold text-xs flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit Price</span>
                      </button>

                      <button
                        onClick={() => handleDelete(srv)}
                        className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-950 text-stone-400 hover:text-rose-400 border border-stone-700 hover:border-rose-800"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-heading font-bold text-stone-100 text-xl">
                {editingService ? 'Edit Service & Price' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-stone-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Men's Fade Haircut"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="haircuts">Haircuts</option>
                    <option value="beard">Beard</option>
                    <option value="shaving">Shaving</option>
                    <option value="skincare">Skincare</option>
                    <option value="treatments">Treatments</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 25 min"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Price ({config.currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.startingPrice}
                    onChange={e => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-bold font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Tier
                  </label>
                  <select
                    value={formData.tier}
                    onChange={e => setFormData({ ...formData, tier: e.target.value as ServiceTier })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="essential">Essential</option>
                    <option value="classic">Classic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short service description for customers..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-300 font-bold">Active on Public Menu</span>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-3 rounded-xl uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold py-3 rounded-xl uppercase text-xs shadow-lg shadow-amber-500/20"
                >
                  Save Service
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
