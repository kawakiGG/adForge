import { Check } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import Title from './Title';
import { plansData } from '../assets/dummy-data';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section id="pricing" className="py-20 bg-slate-900/10 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto px-4">

                <Title
                    title="Pricing"
                    heading="Sleek, transparent pricing"
                    description="Choose the plan that suits your creation frequency. Scale your video ad hook testing instantly."
                />

                {/* MONTHLY/YEARLY TOGGLE */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200/60 p-1 rounded-xl border border-white/5 dark:border-white/5 light:border-slate-350">
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                                billingPeriod === 'monthly' 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-950'
                            }`}
                        >
                            Monthly Billing
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all duration-200 ${
                                billingPeriod === 'yearly' 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-950'
                            }`}
                        >
                            Yearly Billing
                            <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded leading-none">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plansData.map((plan, i) => {
                        const basePrice = parseInt(plan.price.replace('$', ''));
                        const finalPrice = billingPeriod === 'yearly' ? Math.round(basePrice * 0.8) : basePrice;

                        return (
                            <motion.div
                                key={i}
                                ref={(el) => {
                                    refs.current[i] = el;
                                }}
                                initial={{ y: 150, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                                onAnimationComplete={() => {
                                    const card = refs.current[i];
                                    if (card) {
                                        card.classList.add("transition", "duration-500", "hover:scale-102");
                                    }
                                }}
                                className={`relative p-6 rounded-3xl border backdrop-blur ${plan.popular
                                    ? 'border-indigo-500/40 bg-indigo-950/10'
                                    : 'border-slate-800/80 bg-slate-900/20'
                                    }`}
                            >
                                {plan.popular && (
                                    <p className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                                        Most popular
                                    </p>
                                )}

                                <div className="mb-6">
                                    <p className="font-bold text-slate-300 dark:text-slate-300 light:text-slate-700 capitalize text-sm">{plan.name}</p>
                                    <div className="flex items-end gap-1 mt-2">
                                        <span className="text-3xl font-black text-slate-100 dark:text-slate-100 light:text-slate-900">${finalPrice}</span>
                                        <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 pb-1">
                                            / month
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-2 leading-relaxed">
                                        {plan.desc}
                                    </p>
                                </div>

                                <ul className="space-y-3 mb-8 border-t border-slate-800/50 dark:border-slate-800/50 light:border-slate-200 pt-4">
                                    {plan.features.map((feat, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-650"
                                        >
                                            <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div>
                                    <Link to="/auth" className="w-full block">
                                        {plan.popular ? (
                                            <PrimaryButton className="w-full py-2.5 rounded-xl justify-center text-xs font-bold text-white">
                                               BUY NOW
                                            </PrimaryButton>
                                        ) : (
                                            <GhostButton className="w-full justify-center py-2.5 rounded-xl text-xs font-bold">
                                                BUY NOW
                                            </GhostButton>
                                        )}
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};