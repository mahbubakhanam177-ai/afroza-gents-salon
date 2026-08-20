import React, { useState } from 'react';
import { Star, ExternalLink, Save, CheckCircle, MapPin, Award, Trash2, Check, X, MessageSquare } from 'lucide-react';
import { useSalon } from '../../context/SalonContext';

export const AdminReviews: React.FC = () => {
  const { config, updateConfig, reviews, toggleReviewApproval, deleteReview } = useSalon();

  const [rating, setRating] = useState(config.googleRating || 4.6);
  const [reviewCount, setReviewCount] = useState(config.googleReviewCount || 83);
  const [mapsUrl, setMapsUrl] = useState(config.googleMapsUrl || 'https://maps.app.goo.gl/fVroDt5YXfmSTfnGA');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateConfig({
      ...config,
      googleRating: Number(rating),
      googleReviewCount: Number(reviewCount),
      googleMapsUrl: mapsUrl
    });

    setNotification('Google Reviews & Rating data updated across public site!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggleApproval = async (id: string, name: string, isApproved: boolean) => {
    await toggleReviewApproval(id);
    setNotification(`Review by ${name} is now ${!isApproved ? 'Approved (Public)' : 'Unapproved (Hidden)'}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete review from ${name}?`)) {
      await deleteReview(id);
      setNotification(`Deleted review from ${name}.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Page Header */}
      <div className="border-b border-stone-800 pb-5">
        <h1 className="font-display text-2xl font-bold text-stone-100">
          Google Business Reviews & Customer Feedback
        </h1>
        <p className="text-xs text-stone-300 mt-1">
          Manage your official Google Business rating and approve customer reviews stored in Supabase.
        </p>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 shadow-xl">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{notification}</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Official Google Business Rating</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-stone-100 font-display">
                {rating}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    className={`w-5 h-5 ${s <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : s <= rating ? 'text-amber-400 fill-amber-400/50' : 'text-stone-700'}`} 
                  />
                ))}
              </div>
            </div>

            <p className="text-stone-300 text-xs">
              Based on <strong className="text-amber-400 font-bold">{reviewCount} verified Google reviews</strong> for {config.salonName} in Dubai.
            </p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
          >
            <MapPin className="w-4 h-4" />
            <span>View All Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <h3 className="font-heading font-bold text-stone-100 text-sm uppercase tracking-wider border-b border-stone-800 pb-3">
          Update Review Highlights
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Google Rating (out of 5.0)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              required
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 text-sm font-bold font-mono focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
              Total Review Count
            </label>
            <input
              type="number"
              min="1"
              required
              value={reviewCount}
              onChange={e => setReviewCount(Number(e.target.value))}
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 text-sm font-bold font-mono focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
            Google Maps Business Link
          </label>
          <input
            type="url"
            required
            value={mapsUrl}
            onChange={e => setMapsUrl(e.target.value)}
            className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 text-xs font-mono focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98"
          >
            <Save className="w-4 h-4" />
            <span>Save Review Settings</span>
          </button>
        </div>
      </form>

      {/* Customer Reviews Approval Table / Cards */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Customer Testimonials & Reviews ({reviews.length})</span>
          </div>
          <span className="text-[11px] text-stone-400 font-medium">Only approved reviews are shown on public website</span>
        </div>

        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-stone-400 text-xs py-4 text-center">No reviews submitted yet.</p>
          ) : (
            reviews.map((rev) => {
              const isApproved = rev.isApproved !== false;
              return (
                <div key={rev.id} className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-100 text-xs">{rev.clientName}</span>
                      <span className="text-[10px] text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 font-bold uppercase">{rev.clientType}</span>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-300 text-xs italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-stone-400 font-mono">Service: {rev.service}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleApproval(rev.id, rev.clientName, isApproved)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1 transition-colors ${
                        isApproved ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Approved</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(rev.id, rev.clientName)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/50 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
