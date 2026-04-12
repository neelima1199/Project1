"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, PieChart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ObsidianCard, SectionTitle, BrassLine } from '../../../packages/lumina-ui';

export default function DashboardHome() {
  const [data] = useState({
    revenue: "1,482,900",
    orders: "15,640",
    conversion: "4.85",
    sentiment: "88"
  });

  return (
    <main style={{ padding: '6rem', maxWidth: '1600px', margin: '0 auto', background: 'var(--bg-bone)', minHeight: '100vh' }}>
      <header style={{ marginBottom: '6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="mono" style={{ color: 'var(--accent-brass)', marginBottom: '1rem' }}>INTEL / SYSTEM_01</div>
          <h1 style={{ fontSize: '4rem', margin: 0 }}>METRIC ASSEMBLY</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="mono">SYSTEM STATUS</div>
          <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
             OPERATIONAL <Activity size={14} />
          </div>
        </div>
      </header>

      {/* Primary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '8rem' }}>
        {[
          { label: 'TOTAL REVENUE', value: `$${data.revenue}`, trend: '+18.4%' },
          { label: 'ORDERS', value: data.orders, trend: '+12.1%' },
          { label: 'CONVERSION', value: `${data.conversion}%`, trend: '+0.82%' },
          { label: 'SENTIMENT', value: `${data.sentiment}%`, trend: 'STABLE' },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <ObsidianCard>
              <div className="mono" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{stat.label}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: stat.trend.includes('+') ? '#10b981' : '#000' }}>
                <span className="mono">{stat.trend}</span>
                <ArrowUpRight size={12} />
              </div>
            </ObsidianCard>
          </motion.div>
        ))}
      </div>

      <BrassLine />

      {/* Analytical Visuals */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', marginTop: '4rem' }}>
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '4rem' }}>
          <div className="mono" style={{ color: 'var(--accent-brass)', marginBottom: '2rem' }}>REVENUE TRENDS / 30D</div>
          <div style={{ height: '400px', display: 'flex', alignItems: 'flex-end', gap: '2rem' }}>
            {[30, 45, 35, 70, 55, 90, 80, 100, 85, 120, 110].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: i * 0.05 }}
                style={{
                  flex: 1,
                  background: i === 9 ? 'var(--accent-brass)' : '#000',
                  opacity: 0.1 + (i * 0.08)
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', color: 'var(--text-muted)' }}>
            <span className="mono">OCT 01</span>
            <span className="mono">OCT 15</span>
            <span className="mono">OCT 31</span>
          </div>
        </div>

        <div>
          <div className="mono" style={{ color: 'var(--accent-brass)', marginBottom: '3rem' }}>SENTIMENT ANALYSIS</div>
          <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto' }}>
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" strokeWidth="1" />
              <motion.circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="var(--accent-brass)" strokeWidth="2"
                strokeDasharray="282.7"
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 * (1 - 0.88) }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem' }}>88%</div>
              <div className="mono">POSITIVE</div>
            </div>
          </div>
          <div style={{ marginTop: '4rem' }}>
            <div className="mono" style={{ marginBottom: '1rem' }}>TOP CATEGORIES</div>
            {['TECH', 'LUXURY', 'FASHION'].map((cat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderTop: '1px solid #eee' }}>
                <span className="mono">{cat}</span>
                <span className="mono">{(90 - i * 10)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
