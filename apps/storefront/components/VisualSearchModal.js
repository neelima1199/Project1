"use client";

import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, NeonButton } from '../../../packages/lumina-ui';

export const VisualSearchModal = ({ isOpen, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onClose(); // In a real app, this would trigger a search
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
          }}
        >
          <GlassCard style={{ width: '500px', textAlign: 'center', position: 'relative' }}>
            <X 
              size={24} 
              style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} 
              onClick={onClose}
            />
            <h2 style={{ marginBottom: '2rem' }}>Visual Discovery</h2>
            <div style={{
              border: '2px dashed #444',
              borderRadius: '20px',
              padding: '3rem',
              marginBottom: '2rem',
              background: 'rgba(255,255,255,0.02)',
              cursor: 'pointer'
            }} onClick={handleUpload}>
              {isUploading ? (
                <div style={{ color: 'var(--accent-secondary)' }}>AI analyzing image...</div>
              ) : (
                <>
                  <Camera size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
                  <div>Drop an image or click to upload</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Aether Vision will find matches in our repository
                  </div>
                </>
              )}
            </div>
            <NeonButton onClick={onClose}>Cancel</NeonButton>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
