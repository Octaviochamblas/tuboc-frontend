import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/56976141490" target="_blank" rel="noreferrer" className="whatsapp-button" aria-label="Contactar por WhatsApp">
      <MessageCircle size={32} />
    </a>
  );
}
