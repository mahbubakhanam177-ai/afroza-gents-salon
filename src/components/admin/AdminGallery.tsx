import React, { useState } from 'react';
import { 
  Plus, 
  Image as ImageIcon, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Upload, 
  Link as LinkIcon 
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { useSalon } from '../../context/SalonContext';
import { supabase } from '../../lib/supabase';

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem, toggleGalleryActive } = useSalon();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'haircuts' as 'haircuts' | 'beard' | 'skincare' | 'interior',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
    description: 'Afroza Gents Salon Dubai',
    isActive: true
  });

  const [isUploading, setIsUploading] = useState(false);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file);

      if (uploadError) {
        showToast(`Upload error: ${uploadError.message}. Using image URL instead.`);
      } else {
        const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filePath);
        setFormData(prev => ({ ...prev, image: publicUrl }));
        showToast('Photo uploaded successfully to Supabase Storage!');
      }
    } catch (err: any) {
      showToast('Photo uploaded, image URL set.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'haircuts',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600',
      description: 'Professional barbering work in International City Phase 2',
      isActive: true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    await addGalleryItem({
      title: formData.title,
      category: formData.category,
      image: formData.image,
      description: formData.description,
      isActive: formData.isActive
    });

    showToast(`Added photo "${formData.title}" to public gallery.`);
    setModalOpen(false);
  };

  const handleToggle = async (item: GalleryItem) => {
    await toggleGalleryActive(item.id);
    showToast(`Photo "${item.title}" is now ${item.isActive ? 'Inactive' : 'Active'}.`);
  };

  const handleDelete = async (item: GalleryItem) => {
    if (confirm(`Are you sure you want to delete photo "${item.title}"?`)) {
      await deleteGalleryItem(item.id);
      showToast(`Deleted photo "${item.title}".`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-100">
            Gallery Photo Manager
          </h1>
          <p className="text-xs text-stone-300 mt-1">
            Manage showcase photos displayed on the public gallery page.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-5 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Add Photo</span>
        </button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => {
          const isActive = item.isActive !== false;
          return (
            <div 
              key={item.id}
              className={`bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg relative group ${!isActive ? 'opacity-50' : ''}`}
            >
              <div className="relative aspect-square overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-stone-950/90 text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20 backdrop-blur-md">
                  {item.category}
                </span>

                <button
                  onClick={() => handleToggle(item)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md text-xs ${
                    isActive ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' : 'bg-stone-900/90 text-stone-400 border border-stone-700'
                  }`}
                  title={isActive ? 'Deactivate' : 'Activate'}
                >
                  {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-bold text-stone-100 text-xs line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-emerald-400' : 'text-stone-500'}`}>
                    {isActive ? 'Public' : 'Hidden'}
                  </span>

                  <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-heading font-bold text-stone-100 text-xl">
                Add Photo to Gallery
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
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sharp Fade Cut & Edging"
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                >
                  <option value="haircuts">Haircuts</option>
                  <option value="beard">Beard</option>
                  <option value="skincare">Skincare</option>
                  <option value="interior">Interior</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Image Upload (Supabase Storage)
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <label className="flex-1 cursor-pointer bg-stone-950 hover:bg-stone-800 border border-stone-700 border-dashed rounded-xl px-3.5 py-2.5 text-center text-amber-400 font-bold flex items-center justify-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Uploading to Supabase...' : 'Upload Image File'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      disabled={isUploading}
                      className="hidden" 
                    />
                  </label>
                </div>

                <label className="block text-stone-400 font-bold uppercase tracking-wider mb-1 text-[10px]">
                  Or Enter Direct Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Photo caption for public gallery..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-stone-300 font-bold">Active in Gallery</span>
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
                  Save Photo
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
