'use client';

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { DataTerrain } from '@/components/3d/DataTerrain';
import { Environment } from '@react-three/drei';

export default function FinancialDashboard() {
  const metrics = [
    { label: 'Revenue (TTM)', value: '$1.24B', change: '+12.4%', color: 'text-evergreen' },
    { label: 'R&D Spend', value: '$450M', change: '+8.2%', color: 'text-steel-blue' },
    { label: 'Cash Reserves', value: '$2.8B', change: 'Stable', color: 'text-graphite' },
    { label: 'Operating Margin', value: '24.2%', change: '+1.5%', color: 'text-evergreen' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="border-b border-platinum pb-6 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-semibold text-graphite mb-2">Financial Performance</h1>
           <p className="text-text-meta">Consolidated data room for Living Systems Intelligence.</p>
        </div>
        <div className="text-right">
           <span className="text-[10px] font-bold text-evergreen uppercase tracking-widest bg-evergreen/10 px-2 py-1 rounded">Session Verified</span>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={m.label} 
            className="bg-white border border-platinum p-6 rounded-xl shadow-sm"
          >
            <p className="text-xs font-bold text-text-meta uppercase mb-2">{m.label}</p>
            <div className="text-2xl font-bold text-graphite mb-1">{m.value}</div>
            <p className={`text-xs font-medium ${m.color}`}>{m.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Chart Area */}
        <div className="lg:col-span-2 bg-graphite rounded-2xl overflow-hidden h-[450px] relative border border-platinum">
           <div className="absolute inset-0 z-0 opacity-30">
              <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                <DataTerrain />
                <ambientLight intensity={0.5} />
                <Environment preset="city" />
              </Canvas>
           </div>
           <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 pointer-events-none">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-white font-bold text-lg">Revenue Trajectory</h3>
                    <p className="text-gray-400 text-xs">Projection Model v2.4 (Monte Carlo Simulation)</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur px-3 py-1 rounded border border-white/10 text-[10px] text-white font-mono">
                    REAL_TIME_COMPUTE
                 </div>
              </div>
              
              <div className="flex items-end gap-2 h-48">
                 {[60, 70, 55, 85, 95, 110, 105, 130, 150].map((h, i) => (
                   <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h / 2}%` }}
                    transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-steel-blue to-cyan-400 opacity-80 rounded-t-sm" 
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white border border-platinum rounded-xl p-8 shadow-sm">
           <h3 className="font-bold text-graphite mb-6">Unit Economics</h3>
           <div className="space-y-6">
              {[
                { name: 'Customer Acquisition', cost: '$12k', efficiency: '92%' },
                { name: 'Model Training (GPU)', cost: '$2.4M', efficiency: '84%' },
                { name: 'LSI Logistics', cost: '$800k', efficiency: '98%' }
              ].map((item) => (
                <div key={item.name} className="border-b border-platinum pb-4 last:border-0">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-graphite">{item.name}</span>
                      <span className="font-mono text-text-meta">{item.cost}</span>
                   </div>
                   <div className="w-full bg-off-white h-1.5 rounded-full overflow-hidden">
                      <div className="bg-steel-blue h-full" style={{ width: item.efficiency }}></div>
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full mt-8 py-3 border border-graphite text-graphite font-bold rounded-lg hover:bg-graphite hover:text-white transition-all text-sm">
              Generate Detailed P&L PDF
           </button>
        </div>
      </div>
    </div>
  );
}
