import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, AlertCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitting(false);

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    toast.success('Message sent successfully! Vidhi will get back to you soon.', {
      description: `Thank you, ${data.name}!`,
    });

    reset();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[30%] left-[-25%] w-[400px] h-[400px] bg-softpink/5 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-25%] w-[350px] h-[350px] bg-lavender/5 rounded-full blur-[90px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-dark lavender">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-slate-800 dark:text-white">
            Let's Build Something Meaningful Together
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-lavender via-softpink to-skyblue rounded-full" />
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">

          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-xs md:text-sm text-slate-900 dark:text-slate-500 font-sans leading-relaxed font-semibold">
                Whether you want to discuss a new software engineering internship opportunity, contribute to open-source systems, or simply connect—my inbox is open!
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Link */}
              <a
                href="mailto:vidhiisingh2403@gmail.com"
                className="flex items-center gap-4 glass-effect border border-glassBorder dark:border-glassBorderDark p-4 rounded-2xl hover:border-purple-300 dark:hover:border-slate-800 transition-colors group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-650 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-900 dark:text-slate-500">Email Me</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white font-sans group-hover:underline">
                    vidhiisingh2403@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://LinkedIn.com/in/vidhi-singh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-effect border border-glassBorder dark:border-glassBorderDark p-4 rounded-2xl hover:border-pink-300 dark:hover:border-slate-800 transition-colors group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-slate-800 flex items-center justify-center text-pink-650 shrink-0">
                  <Linkedin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-900 dark:text-slate-500">Connect LinkedIn</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white font-sans group-hover:underline">
                    linkedin.com/in/vidhi-singh
                  </p>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/vidhisingh24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-effect border border-glassBorder dark:border-glassBorderDark p-4 rounded-2xl hover:border-blue-300 dark:hover:border-slate-800 transition-colors group cursor-pointer shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-650 shrink-0">
                  <Github size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-900 dark:text-slate-500">Explore Repos</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-white font-sans group-hover:underline">
                    github.com/vidhisingh24
                  </p>
                </div>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-lavender/20 to-skyblue/20 dark:from-slate-800/40 border border-glassBorder dark:border-glassBorderDark text-[10px] text-slate-600 dark:text-slate-450 leading-relaxed font-sans font-bold">
              🔒 Form responses are handled asynchronously. Submit datasets are cleared after toast responses dispatch.
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="lg:col-span-7">
            <GlassCard className="border border-glassBorder dark:border-glassBorderDark p-8 h-full shadow-xs" noTilt>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  {/* Full Name Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-400 font-sans" htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full px-4 py-3 text-xs bg-white/40 dark:bg-slate-900/60 text-slate-800 dark:text-white border ${errors.name ? 'border-red-400' : 'border-glassBorder dark:border-glassBorderDark'} rounded-xl focus:outline-none focus:border-purple-400 transition-colors font-sans`}
                      placeholder="Jane Doe"
                      {...register('name', { required: 'Full Name is required' })}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1 font-bold font-sans">
                        <AlertCircle size={12} /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-400 font-sans" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full px-4 py-3 text-xs bg-white/40 dark:bg-slate-900/60 text-slate-800 dark:text-white border ${errors.email ? 'border-red-400' : 'border-glassBorder dark:border-glassBorderDark'} rounded-xl focus:outline-none focus:border-purple-400 transition-colors font-sans`}
                      placeholder="jane.doe@example.com"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address structure'
                        }
                      })}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1 font-bold font-sans">
                        <AlertCircle size={12} /> {errors.email.message}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-400 font-sans" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      className={`w-full px-4 py-3 text-xs bg-white/40 dark:bg-slate-900/60 text-slate-800 dark:text-white border ${errors.subject ? 'border-red-400' : 'border-glassBorder dark:border-glassBorderDark'} rounded-xl focus:outline-none focus:border-purple-400 transition-colors font-sans`}
                      placeholder="Internship / Collaboration / Hello"
                      {...register('subject', { required: 'Subject heading is required' })}
                    />
                    {errors.subject && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1 font-bold font-sans">
                        <AlertCircle size={12} /> {errors.subject.message}
                      </span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-400 font-sans" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`w-full px-4 py-3 text-xs bg-white/40 dark:bg-slate-900/60 text-slate-800 dark:text-white border ${errors.message ? 'border-red-400' : 'border-glassBorder dark:border-glassBorderDark'} rounded-xl focus:outline-none focus:border-purple-400 transition-colors font-sans resize-none`}
                      placeholder="Hi Vidhi, I saw your portfolio and would love to chat about..."
                      {...register('message', {
                        required: 'Message content is required',
                        minLength: { value: 10, message: 'Message must exceed 10 characters' }
                      })}
                    />
                    {errors.message && (
                      <span className="text-[10px] text-red-500 flex items-center gap-1.5 mt-1 font-bold font-sans">
                        <AlertCircle size={12} /> {errors.message.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 mt-6 py-3.5 bg-gradient-to-r from-lavender via-softpink to-skyblue text-slate-900 font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all focus:outline-none active:scale-[0.98] disabled:opacity-50 cursor-pointer text-xs uppercase tracking-wide border border-white/20"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
