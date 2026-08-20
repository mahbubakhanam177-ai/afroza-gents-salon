import React, { useState } from 'react';
import { 
  Plus, 
  Tag, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Calendar, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { OfferItem } from '../../types';
import { useSalon } from '../../context/SalonContext';

export const AdminOffers: React.FC = () => {
  const { config, offers, addOffer, updateOffer, deleteOffer } = useSalon();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    badge: 'Special Offer',
    includedServicesText: "Men's Haircut, Beard Trim, Hot Towel",
    price: 50,
    originalPrice: 70,
    validity: 'Limited Time',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    isActive: true,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({
      title: '',
      badge: 'Special Combo',
      includedServicesText: "Men's Haircut, Beard Sculpting, Hot Towel Shave",
      price: 50,
      originalPrice: 70,
      validity: 'Valid Daily',
      description: 'Special grooming package for Dubai residents and visitors.',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (off: OfferItem) => {
    setEditingOffer(off);
    setFormData({
      title: off.title,
      badge: off.badge,
      includedServicesText: off.includedServices.join(', '),
      price: off.price,
      originalPrice: off.originalPrice || off.price + 20,
      validity: off.validity,
      description: off.description,
      startDate: off.startDate || new Date().toISOString().split('T')[0],
      endDate: off.endDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      isActive: off.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const includedArr = formData.includedServicesText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingOffer) {
      await updateOffer({
        ...editingOffer,
        title: formData.title,
        badge: formData.badge,
        includedServices: includedArr,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        validity: formData.validity,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: formData.isActive
      });
      showToast(`Updated offer "${formData.title}".`);
    } else {
      await addOffer({
        title: formData.title,
        badge: formData.badge,
        includedServices: includedArr,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        validity: formData.validity,
        description: formData.description,
        isDemo: false,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: formData.isActive
      });
      showToast(`Created offer "${formData.title}".`);
    }

    setModalOpen(false);
  };

  const handleToggleActive = async (off: OfferItem) => {
    await updateOffer({
      ...off,
      isActive: !off.isActive
    });
    showToast(`Offer "${off.title}" is now ${!off.isActive ? 'Active' : 'Inactive'}.`);
  };

  const handleDelete = async (off: OfferItem) => {
    if (confirm(`Delete offer "${off.title}"?`)) {
      await deleteOffer(off.id);
      showToast(`Deleted offer "${off.title}".`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-100">
            Promotional Offers
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Create or manage promotional combo packages and discounts.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Create Offer</span>
        </button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((off) => {
          const isExpired = off.endDate && new Date(off.endDate) < new Date();
          const activeStatus = off.isActive !== false && !isExpired;

          return (
            <div 
              key={off.id}
              className={`bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden ${!activeStatus ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {off.badge}
                  </span>

                  <button
                    onClick={() => handleToggleActive(off)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      activeStatus 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    }`}
                  >
                    {activeStatus ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{activeStatus ? 'Active' : (isExpired ? 'Expired' : 'Inactive')}</span>
                  </button>
                </div>

                <h3 className="font-heading font-bold text-stone-100 text-lg">
                  {off.title}
                </h3>

                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {off.description}
                </p>

                <div className="my-3 p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Special Price</span>
                    <span className="text-xl font-black text-amber-400 font-mono">
                      {config.currency} {off.price}
                    </span>
                  </div>
                  {off.originalPrice && (
                    <span className="text-xs text-stone-500 line-through font-mono">
                      {config.currency} {off.originalPrice}
                    </span>
                  )}
                </div>

                <div className="space-y-1 text-xs text-stone-300">
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Included Services:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-200">
                    {off.includedServices.map((srv, i) => (
                      <li key={i}>{srv}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenEdit(off)}
                  className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-100 rounded-xl text-xs font-bold border border-stone-700 flex items-center justify-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(off)}
                  className="p-2 bg-stone-800 hover:bg-rose-950 text-stone-400 hover:text-rose-400 rounded-xl text-xs border border-stone-700 hover:border-rose-800"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Offer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-heading font-bold text-stone-100 text-xl">
                {editingOffer ? 'Edit Offer' : 'Create New Offer'}
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
                  Offer Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Executive Grooming Combo"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Best Value"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Validity Label
                  </label>
                  <input
                    type="text"
                    value={formData.validity}
                    onChange={e => setFormData({ ...formData, validity: e.target.value })}
                    placeholder="e.g. Valid Daily"
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Special Price ({config.currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-amber-400 font-bold font-mono text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Original Price ({config.currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-400 font-mono focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Included Services (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.includedServicesText}
                  onChange={e => setFormData({ ...formData, includedServicesText: e.target.value })}
                  placeholder="e.g. Haircut, Beard Trim, Hot Towel"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short offer summary..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-300 font-bold">Active on Public Website</span>
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
                  Save Offer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
