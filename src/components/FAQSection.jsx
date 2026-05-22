import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQSection.css';

const faqs = [
  { question: "¿Qué es TUBOC?", answer: "Somos una empresa dedicada a la creación de pipas de agua orientadas a la portabilidad y discreción." },
  { question: "¿Cuál es el precio?", answer: "El precio de lanzamiento es de $64.990 para la primera edición, sujeto a disponibilidad al momento de la compra." },
  { question: "¿Qué color está disponible?", answer: "La primera edición está disponible en vidrio azul oscuro." },
  { question: "¿Incluye envase?", answer: "Sí. Cada pieza incluye una carcasa protectora personalizada, diseñada para facilitar el guardado, el transporte y la conservación del producto." },
  { question: "¿Cómo se compra?", answer: "Puedes comprar directamente por WhatsApp. Te enviaremos la información de pago, disponibilidad y despacho según tu ciudad." },
  { question: "¿Hacen envíos a regiones?", answer: "Sí. Realizamos envíos a todo Chile, coordinando el despacho según la ciudad de destino y la disponibilidad vigente al momento de la compra. El costo de despacho será informado al momento de coordinar la compra." },
  { question: "¿Cuánto demora el despacho?", answer: "El despacho se gestiona al día siguiente de confirmada la compra. Los plazos finales de entrega dependerán de la ciudad de destino y del servicio de transporte utilizado." },
  { question: "¿Qué incluye la compra?", answer: "La compra incluye una pipa de agua portátil de vidrio borosilicato azul oscuro y una carcasa protectora personalizada para su guardado y transporte." },
  { question: "¿Qué pasa si llega dañado?", answer: "Si el producto llega dañado durante el transporte, realizaremos la reposición correspondiente previa revisión de fotografías del empaque y de la pieza recibida." },
  { question: "¿Cómo se paga?", answer: "El pago puede realizarse mediante transferencia bancaria o compra directa, según la modalidad disponible al momento de concretar el pedido." },
  { question: "¿Es para mayores de 18 años?", answer: "Sí. Los productos TUBOC son de venta exclusiva para mayores de 18 años y están dirigidos únicamente a personas adultas." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-header">
          <h2>Preguntas <span>frecuentes</span></h2>
          <p style={{color: 'var(--text-muted)', marginTop: '16px'}}>Resolvemos las dudas principales sobre compra, despacho, cuidado y condiciones de adquisición de TUBOC.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className={`faq-item glass-card ${openIndex === index ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: (index % 5) * 0.1 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <ChevronDown className="faq-icon" size={24} />
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="faq-answer"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
