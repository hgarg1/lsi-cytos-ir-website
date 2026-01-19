'use client';

import { Canvas } from '@react-three/fiber';
import { SystemPulse } from '@/components/3d/SystemPulse';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: 'Active Stakeholders', value: '412', change: '+12.4%', trend: 'up' },
    { label: 'Document Access', value: '1.8GB', change: '+4.2%', trend: 'up' },
    { label: 'Platform Availability', value: '99.9%', change: 'Stable', trend: 'neutral' },
    { label: 'Compliance Alerts', value: '0', change: 'None', trend: 'good' },
  ];

  if (!mounted) {
     return null; // Or a skeleton loader to prevent hydration mismatch on complex dashboard
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Executive Dashboard</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Real-time governance and investor activity monitoring.</p>
        </div>
        <div className="flex gap-3">
           <button className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-platinum transition-all shadow-lg shadow-white/5 active:scale-95 w-full md:w-auto">EXPORT_REPORT</button>
        </div>
      </div>

      {/* Modern Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-[#16191E] border border-white/[0.05] p-6 rounded-3xl hover:border-white/[0.1] transition-all group"
          >
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 group-hover:text-steel-blue transition-colors">{stat.label}</p>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className={`text-xs font-semibold flex items-center gap-1.5 ${stat.trend === 'up' ? 'text-evergreen' : stat.trend === 'good' ? 'text-steel-blue' : 'text-gray-500'}`}>
               {stat.trend === 'up' && <span>▲</span>}
               {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Visual Monitoring Center */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-gradient-to-br from-[#16191E] to-[#0A0C10] border border-white/[0.05] rounded-[2.5rem] p-1 relative overflow-hidden h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 z-0">
                 <Canvas camera={{ position: [0, 0, 5] }}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                       <SystemPulse />
                    </Float>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#3A5F7D" />
                    <Environment preset="night" />
                 </Canvas>
              </div>
              
              <div className="relative z-10 p-6 lg:p-10 flex flex-col justify-between h-full pointer-events-none">
                 <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5">
                       <h3 className="text-lg font-bold text-white">Activity Pulse</h3>
                       <p className="text-[10px] text-gray-500 font-mono tracking-widest">GLOBAL_ACCESS_VELOCITY</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                       <div className="h-2 w-full md:w-32 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: ['20%', '60%', '45%', '80%'] }} 
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="h-full bg-steel-blue" 
                          />
                       </div>
                       <span className="text-[10px] font-mono text-steel-blue">LOAD_CAPACITY: 64%</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-[2rem] border border-white/5">
                    <div className="space-y-1 flex justify-between md:block">
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</p>
                       <p className="text-xl font-mono text-evergreen">ACTIVE</p>
                    </div>
                    <div className="space-y-1 flex justify-between md:block">
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protocol</p>
                       <p className="text-xl font-mono text-white">TLS_1.3</p>
                    </div>
                    <div className="space-y-1 flex justify-between md:block">
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Region</p>
                       <p className="text-xl font-mono text-gray-400 truncate">US-EAST-1</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
           <div className="bg-[#16191E] border border-white/[0.05] rounded-3xl p-8">
              <h3 className="text-xs font-bold text-gray-500 mb-6 uppercase tracking-[0.2em]">Recent Access</h3>
              <div className="space-y-6">
                 {[
                   { name: 'David Miller', firm: 'Vanguard', time: 'Just now', icon: 'bg-blue-500/20 text-blue-400' },
                   { name: 'Sarah Chen', firm: 'Point72', time: '12m ago', icon: 'bg-purple-500/20 text-purple-400' },
                   { name: 'James Holt', firm: 'LSI Internal', time: '45m ago', icon: 'bg-gray-500/20 text-gray-400' },
                 ].map((req) => (
                   <div key={req.name} className="flex items-center gap-4 group cursor-pointer">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${req.icon}`}>
                         {req.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                         <p className="text-sm font-bold text-white group-hover:text-steel-blue transition-colors">{req.name}</p>
                         <p className="text-[11px] text-gray-500">{req.firm} &bull; {req.time}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all">VIEW_FULL_LOGS</button>
           </div>

           <div className="bg-steel-blue rounded-[2rem] p-8 text-white shadow-xl shadow-steel-blue/10">
              <h3 className="font-bold text-lg mb-2 leading-tight">Compliance Action</h3>
              <p className="text-xs text-white/70 mb-6 leading-relaxed">Quarterly access review required for 3 institutional partners. Please verify credential expiration dates.</p>
              <button className="w-full py-3 bg-white text-steel-blue font-bold rounded-xl text-xs hover:bg-platinum transition-all">START_REVIEW</button>
           </div>
        </div>

      </div>
    </div>
  );
}
