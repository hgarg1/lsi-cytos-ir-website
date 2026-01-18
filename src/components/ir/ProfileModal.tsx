'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { updateProfile } from '@/app/admin/users/profile-actions';
import { motion } from 'framer-motion';

export default function ProfileModal({ user, onClose }: { user: any, onClose: () => void }) {
  const [name, setName] = useState(user.name || '');
  const [imageUrl, setImageUrl] = useState(user.image || '');
  const [loading, setLoading] = useState(false);
  const isSso = user.isSsoManaged;

  // Body Scroll Lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    if (isSso) return;
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('imageUrl', imageUrl);
    
    await updateProfile(formData);
    setLoading(false);
    onClose();
    window.location.reload();
  }

  function handleFileChange(e: any) {
    if (isSso) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      {/* Modal Card */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-[#0F1216] border border-white/10 rounded-[2rem] p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-6 right-6">
           <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">Identity Profile</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your institutional identity parameters.</p>
        </div>

        {isSso && (
          <div className="mb-8 p-4 bg-steel-blue/10 border border-steel-blue/20 rounded-2xl text-[10px] text-steel-blue font-mono uppercase tracking-widest flex items-center gap-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            MANAGED_BY_CORPORATE_SSO
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center gap-6">
             <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-[#16191E] overflow-hidden border-4 border-white/5 group-hover:border-steel-blue/50 transition-all duration-500 flex items-center justify-center shadow-2xl">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-platinum/20">
                      {user.name?.substring(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                {!isSso && (
                  <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full cursor-pointer backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Update</span>
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                )}
             </div>
             <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono">Biometric_Interface_v4</p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              disabled={isSso}
              className={`w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-steel-blue focus:ring-1 focus:ring-steel-blue transition-all ${isSso ? 'opacity-40 cursor-not-allowed' : ''}`}
              placeholder="Full Name"
            />
          </div>

          <div className="pt-4">
             <button 
              type="submit" 
              disabled={loading || isSso}
              className={`w-full font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl ${isSso ? 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed' : 'bg-white text-[#0F1216] hover:bg-platinum active:scale-[0.98]'}`}
             >
               {isSso ? 'IDENTITY_LOCKED' : (loading ? 'SYNCHRONIZING...' : 'UPDATE_PROFILE')}
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}