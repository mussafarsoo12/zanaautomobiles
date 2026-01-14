import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-0 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
          
          {/* Info Side */}
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-display font-bold text-white mb-6">Get in Touch</h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Visit our showroom to experience our collection in person. Our team is ready to assist you with any inquiries.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Visit Us</h3>
                  <p className="text-zinc-400">123 Performance Blvd<br />Automotive District, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Call Us</h3>
                  <p className="text-zinc-400">Sales: +1 (555) 123-4567<br />Service: +1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                  <p className="text-zinc-400">sales@zanaauto.com<br />support@zanaauto.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-white/5 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Opening Hours</h3>
                  <p className="text-zinc-400">Mon - Fri: 9:00 AM - 8:00 PM<br />Saturday: 10:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side (Placeholder) */}
          <div className="h-full min-h-[400px] bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-500 font-medium">Interactive Map Placeholder</p>
              </div>
            </div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none border-[6px] border-zinc-950/20 rounded-3xl" />
          </div>

        </div>
      </div>
    </div>
  );
}
