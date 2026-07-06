import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Shield, Truck, MapPin, Phone, Mail, Award, Users, Package, Smile } from 'lucide-react';

const stats = [
  { icon: <Smile size={28} />, num: '1,000+', label: 'Happy Kids' },
  { icon: <Package size={28} />, num: '200+',   label: 'Products' },
  { icon: <Users size={28} />, num: '500+',    label: 'Families Served' },
  { icon: <Award size={28} />, num: '5★',       label: 'Customer Rating' },
];

const values = [
  {
    icon: <Shield size={32} />,
    title: 'Safe & Certified',
    desc: 'Every toy in our store meets Indian safety standards (IS:9873). We never compromise on your child\'s safety.',
    color: '#1ecab8',
  },
  {
    icon: <Star size={32} />,
    title: 'Premium Quality',
    desc: 'We carefully curate only the best toys — durable, non-toxic, and designed to last through years of play.',
    color: '#c9a84c',
  },
  {
    icon: <Heart size={32} />,
    title: 'Made with Love',
    desc: 'We are parents too. Every product we choose is something we would happily give to our own children.',
    color: '#e8547a',
  },
  {
    icon: <Truck size={32} />,
    title: 'Fast Delivery',
    desc: 'Orders delivered across Chennai and Tamil Nadu. Free shipping on orders above ₹999.',
    color: '#7c5cbf',
  },
];

const teamMembers = [
  {
    name: 'Founder',
    role: 'CEO & Head Curator',
    desc: 'Passionate about bringing joy to children through thoughtfully selected toys.',
    avatar: '👨‍💼',
  },
  {
    name: 'Product Team',
    role: 'Quality & Safety',
    desc: 'Our experts test every product before it makes it to our shelves.',
    avatar: '🔍',
  },
  {
    name: 'Customer Care',
    role: 'Support Team',
    desc: 'Always here to help you find the perfect toy for your little one.',
    avatar: '💬',
  },
];

export const About = () => {
  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh' }}>

      {/* ─── Hero Banner ─────────────────────────────── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0d1229 0%, #16082e 60%, #060917 100%)',
        padding: '100px 0 80px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        {/* Gold orb */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-60px',
          width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(232,84,122,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <span style={{
            display: 'inline-block',
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.35)',
            color: 'var(--gold-bright)',
            padding: '8px 24px',
            borderRadius: '50px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px',
            backdropFilter: 'blur(8px)',
          }}>
            ✦ Our Story ✦
          </span>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#f0ead6',
            marginBottom: '20px',
            lineHeight: 1.15,
          }}>
            About <span style={{
              background: 'linear-gradient(135deg, #c9a84c, #f0c862, #c9a84c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>பொம்மைக் கடை</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(240,234,214,0.65)',
            maxWidth: '580px',
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}>
            Chennai's most trusted premium toy boutique — bringing smiles to children and peace of mind to parents since day one.
          </p>

          <Link to="/shop" className="btn-accent">
            🛒 Explore Our Collection
          </Link>
        </div>
      </section>

      {/* ─── Stats Row ───────────────────────────────── */}
      <section style={{ padding: '0', background: 'rgba(201,168,76,0.04)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: '36px 24px',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ color: 'var(--gold)', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                  {s.icon}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem', fontWeight: 800,
                  color: 'var(--gold-bright)',
                  lineHeight: 1, marginBottom: '6px',
                }}>{s.num}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,234,214,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Story ───────────────────────────────── */}
      <section style={{ padding: '90px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

            {/* Left — Text */}
            <div>
              <span style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
                ✦ Who We Are
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 800, color: '#f0ead6', marginBottom: '24px', lineHeight: 1.2 }}>
                More Than a Toy Shop — <br />
                <span style={{ color: 'var(--gold-bright)' }}>A Childhood Experience</span>
              </h2>
              <p style={{ color: 'rgba(240,234,214,0.65)', lineHeight: 1.9, marginBottom: '20px', fontSize: '1rem' }}>
                <strong style={{ color: '#f0ead6' }}>பொம்மைக் கடை</strong> (Bommai Kadai) was born from a simple belief — every child deserves toys that inspire creativity, develop skills, and create memories that last a lifetime.
              </p>
              <p style={{ color: 'rgba(240,234,214,0.65)', lineHeight: 1.9, marginBottom: '20px', fontSize: '1rem' }}>
                Based in the heart of <strong style={{ color: '#f0ead6' }}>Chennai, Tamil Nadu</strong>, we hand-pick every product in our store with the same care a parent would. From baby rattles to brain games, from fancy accessories to soft plushies — we stock only what we trust.
              </p>
              <p style={{ color: 'rgba(240,234,214,0.65)', lineHeight: 1.9, fontSize: '1rem' }}>
                We are a family-owned business that takes pride in making toy shopping a delightful experience for parents and an exciting adventure for kids.
              </p>

              <div style={{ marginTop: '36px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{
                  padding: '14px 22px', borderRadius: '12px',
                  background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <MapPin size={18} color="var(--gold)" />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ fontSize: '0.9rem', color: '#f0ead6', fontWeight: 600 }}>Chennai, Tamil Nadu</div>
                  </div>
                </div>
                <div style={{
                  padding: '14px 22px', borderRadius: '12px',
                  background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <Phone size={18} color="var(--gold)" />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Call Us</div>
                    <div style={{ fontSize: '0.9rem', color: '#f0ead6', fontWeight: 600 }}>+91 80840 04747</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Visual card */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'linear-gradient(145deg, #111730, #16082e)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '24px',
                padding: '48px 36px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.08)',
              }}>
                {/* Gold top border line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

                <div style={{ fontSize: '5rem', marginBottom: '20px', lineHeight: 1 }}>🧸</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold-bright)', marginBottom: '12px' }}>
                  Our Promise
                </h3>
                <p style={{ color: 'rgba(240,234,214,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '28px' }}>
                  "Every toy we sell is tested for safety, selected for quality, and chosen to bring genuine joy."
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  {['100% Safe & Non-toxic', 'ISI Certified Products', 'Age-appropriate Toys', 'Easy Returns & Exchanges'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: 'var(--gold-bright)', fontSize: '0.7rem' }}>✓</span>
                      </div>
                      <span style={{ color: 'rgba(240,234,214,0.75)', fontSize: '0.9rem', fontWeight: 500 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating emoji decorations */}
              <div style={{ position: 'absolute', top: '-16px', right: '-16px', fontSize: '2.2rem', animation: 'float1 6s ease-in-out infinite' }}>✨</div>
              <div style={{ position: 'absolute', bottom: '-12px', left: '-12px', fontSize: '2rem', animation: 'float2 7s ease-in-out infinite' }}>🚗</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Our Values ──────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'rgba(13,18,41,0.6)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">What We Stand For</span>
            <h2>Our Core Values</h2>
            <p>The principles that guide every decision we make — from the products we choose to the service we deliver.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '36px 28px',
                transition: 'all 0.4s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = v.color + '55';
                  e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.4), 0 0 32px ${v.color}18`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px',
                  background: `${v.color}15`,
                  border: `1px solid ${v.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: v.color, marginBottom: '20px',
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: '#f0ead6', marginBottom: '12px' }}>
                  {v.title}
                </h3>
                <p style={{ color: 'rgba(240,234,214,0.55)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Section ────────────────────────────── */}
      <section style={{ padding: '90px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The People Behind It</span>
            <h2>Meet Our Team</h2>
            <p>A small, passionate team dedicated to making every child's playtime extraordinary.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '860px', margin: '0 auto' }}>
            {teamMembers.map((m, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '40px 28px',
                textAlign: 'center',
                transition: 'all 0.4s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{m.avatar}</div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold-bright)', marginBottom: '6px' }}>{m.name}</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>{m.role}</div>
                <p style={{ color: 'rgba(240,234,214,0.55)', fontSize: '0.88rem', lineHeight: 1.7 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Strip ────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(124,92,191,0.06) 100%)',
        border: '1px solid var(--border)',
        padding: '64px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#f0ead6', marginBottom: '12px' }}>
            Get in Touch
          </h2>
          <p style={{ color: 'rgba(240,234,214,0.55)', fontSize: '1rem', marginBottom: '40px' }}>
            Have questions? We'd love to hear from you.
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: <Phone size={20} />, label: 'Call Us', value: '+91 80840 04747', href: 'tel:+918084004747' },
              { icon: <Mail size={20} />, label: 'Email', value: 'bommaigadai@gmail.com', href: 'mailto:bommaigadai@gmail.com' },
              { icon: <MapPin size={20} />, label: 'Location', value: 'Chennai, Tamil Nadu', href: '#' },
            ].map((c, i) => (
              <a key={i} href={c.href} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '20px 28px',
                minWidth: '230px', textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ color: 'var(--gold)', flexShrink: 0 }}>{c.icon}</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>{c.label}</div>
                  <div style={{ fontSize: '0.92rem', color: '#f0ead6', fontWeight: 600 }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-accent">🛒 Shop Now</Link>
            <Link to="/" className="btn-outline">← Back to Home</Link>
          </div>
        </div>
      </section>

    </div>
  );
};
