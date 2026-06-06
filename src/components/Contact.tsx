import { useEffect, useRef, useState } from 'react';import { Mail, Phone, MapPin, Clock, Globe, ArrowRight, Loader, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', city: '', scheme: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const webUrl = 'https://script.google.com/macros/s/AKfycbyPHuGFTDQuFQPPiHPJTB8k8MkOnG5n2-tAlxDG0DE7mf1MrxBGJeTsd3fs4Pf2b2NB9A/exec'; 

      const response = await fetch(webUrl, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          city: formData.city,
          scheme: formData.scheme,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Submission failed.');
      }

      setSubmitted(true);
      setFormData({ name: '', mobile: '', email: '', city: '', scheme: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '95144 33333', href: 'tel:9514433333' },
    { icon: Mail, label: 'Email', value: 'aspirechitfunds@gmail.com', href: 'mailto:aspirechitfunds@gmail.com' },
    { icon: Globe, label: 'Website', value: 'www.aspirechitfunds.in', href: 'https://www.aspirechitfunds.in' },
    { icon: MapPin, label: 'Head Office', value: '3rd Floor, Nagammai Building, New VOC Park Roundana, Coimbatore – 641018', href: '#' },
    { icon: Clock, label: 'Business Hours', value: 'Monday – Saturday, 9:30 AM – 6:30 PM', href: '#' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-[#082340] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(207,175,93,0.08) 0%, transparent 60%)' }}
      />
      <div className="network-pattern absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal">
          <p className="text-[#D4B16A] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Get In Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
            Contact Our Financial Experts
          </h2>
          <div className="gold-divider mb-5" />
          <p className="text-[#D4B16A]/80 text-lg max-w-2xl mx-auto">
            Our financial experts are ready to help you choose the perfect chit scheme for your savings goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Contact Info & Map */}
          <div className="space-y-6 reveal-left">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="group block p-5 rounded-2xl bg-white border border-[#CFAF5D]/15 hover:border-[#CFAF5D]/40 hover:shadow-gold transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#082340]/10 to-[#082340]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[#082340]/20 group-hover:to-[#082340]/10 transition-all duration-300">
                      <Icon className="text-[#CFAF5D]" size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#082340] text-xs font-bold tracking-widest uppercase">{label}</p>
                      <p className="text-[#082340] text-sm font-medium mt-0.5 leading-snug break-words group-hover:text-[#082340] transition-colors">{value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Google Map */}
            <div
              className="rounded-3xl overflow-hidden shadow-lg border border-[#CFAF5D]/20 reveal-left"
              style={{ animationDelay: '0.2s', position: 'relative', paddingBottom: '56.25%', height: 0 }}
            >
              <iframe
                title="Aspire Chit Fund Location"
                src="https://maps.google.com/maps?q=New%20VOC%20Park%2C%20Coimbatore%2C%20Tamil%20Nadu%2C%20India&z=15&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column - Callback Form */}
          <div className="reveal-right">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-[#CFAF5D]/15">
              <h3 className="font-serif text-2xl font-bold text-[#082340] mb-2">Request a Free Consultation</h3>
              <p className="text-[#082340]/80 text-sm mb-8">Our team will call you back within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitted && (
                  <div className="p-4 rounded-xl bg-white border border-[#CFAF5D]/20 flex gap-3 items-start">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">Request Submitted!</p>
                      <p className="text-green-800 text-xs mt-0.5">We'll contact you shortly.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-xl bg-[#082340]/40 border border-[#CFAF5D]/20">
                    <p className="text-[#082340] text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Name & Mobile Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] placeholder-[#082340]/50 focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 disabled:opacity-50"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 95144 33333"
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] placeholder-[#082340]/50 focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 disabled:opacity-50"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email & City Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] placeholder-[#082340]/50 focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 disabled:opacity-50"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">City</label>
                    <input
                      type="text"
                      placeholder="Your city"
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] placeholder-[#082340]/50 focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 disabled:opacity-50"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                {/* Preferred Scheme Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">Preferred Chit Scheme</label>
                  <select
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 disabled:opacity-50"
                    value={formData.scheme}
                    onChange={(e) => setFormData({ ...formData, scheme: e.target.value })}
                  >
                    <option value="">Select a scheme</option>
                    <option value="5lakh">₹5 Lakh Scheme</option>
                    <option value="10lakh">₹10 Lakh Scheme</option>
                    <option value="25lakh">₹25 Lakh Scheme</option>
                    <option value="50lakh">₹50 Lakh Scheme (Custom)</option>
                    <option value="1cr">₹1 Crore Scheme (Custom)</option>
                  </select>
                </div>

                {/* Message - Savings Goal */}
                <div>
                  <label className="block text-xs font-semibold text-[#232323] mb-2 tracking-wide">Your Savings Goal & Message</label>
                  <textarea
                    placeholder="Tell us about your financial goals and savings needs..."
                    rows={4}
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-xl border border-[#CFAF5D]/25 bg-white text-[#232323] placeholder-[#082340]/50 focus:outline-none focus:border-[#CFAF5D] focus:bg-[#F7F2E8] transition-all duration-300 resize-none disabled:opacity-50"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="w-full h-14 mt-6 bg-gradient-to-r from-[#082340] to-[#CFAF5D] hover:from-[#082340]/90 hover:to-[#E4C77A] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-gold flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#E4C77A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle size={18} />
                      <span>Request Submitted</span>
                    </>
                  ) : (
                    <>
                      <Phone size={18} />
                      <span>Request a Call Back</span>
                      <ArrowRight size={18} className="ml-auto group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-xs text-[#082340]/60 text-center mt-4">
                  We respect your privacy. Your data is secure and confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}







