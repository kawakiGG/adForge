import { useState } from 'react';
import { CreditCard, Check, ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { PrimaryButton } from '../components/Buttons';
import { plansData } from '../assets/dummy-data';

export default function Billing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activePlan, setActivePlan] = useState('pro');
  const [checkoutPlan, setCheckoutPlan] = useState<any | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'processing' | 'success'>('idle');

  // Hardcoded invoice ledger
  const invoices = [
    { id: 'INV-2026-003', date: 'Jun 15, 2026', amount: '$35.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'May 15, 2026', amount: '$35.00', status: 'Paid' },
    { id: 'INV-2026-001', date: 'Apr 15, 2026', amount: '$35.00', status: 'Paid' },
  ];

  const handleCheckout = (plan: any) => {
    setCheckoutPlan(plan);
    setCheckoutStep('processing');
    
    // Simulate gateway checkout
    setTimeout(() => {
      setCheckoutStep('success');
    }, 2000);
  };

  const finalizeCheckout = () => {
    setActivePlan(checkoutPlan.id);
    setCheckoutPlan(null);
    setCheckoutStep('idle');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-24">
      
      {/* CREDIT TRACKER & ACTIVE PLAN BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active plan card */}
        <div className="glass-panel p-6 rounded-3xl md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
          <div className="space-y-3 z-10">
            <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Current Subscription</span>
            <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-800">
              {activePlan === 'pro' ? 'Pro Creator Plan' : activePlan === 'ultra' ? 'Ultra Agency Plan' : 'Starter Creator Plan'}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
              Your next billing date is <strong className="text-slate-200 dark:text-slate-200 light:text-slate-700">July 15, 2026</strong> for $35/month.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <CreditCard size={14} className="text-slate-400" /> •••• 4242
              </div>
              <button className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold underline">
                Update card
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 shrink-0 z-10">
            <button className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer">
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Credit utilization widget */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
          <div className="space-y-1 z-10">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400 light:text-slate-500">Credit Consumption</span>
            <div className="text-2xl font-black text-slate-100 dark:text-slate-100 light:text-slate-900">45 / 100</div>
            <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500">Resetting on July 15, 2026</p>
          </div>

          <div className="space-y-1.5 pt-4 z-10">
            <div className="w-full bg-slate-800 dark:bg-slate-800 light:bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full" style={{ width: '45%' }} />
            </div>
            <div className="flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-semibold">
              <span>45% Used</span>
              <span>55 Credits Available</span>
            </div>
          </div>
        </div>

      </div>

      {/* PLAN TIERS PRICING GRID */}
      <div className="space-y-6">
        
        {/* Toggle Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">Upgrade or Adjust Your Tier</h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Select the plan that matches your campaign scale</p>
          </div>

          {/* Toggle */}
          <div className="flex bg-slate-950 dark:bg-slate-950 light:bg-slate-100 p-1 rounded-xl border border-slate-850 dark:border-slate-850 light:border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all ${
                billingPeriod === 'yearly' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900'
              }`}
            >
              Yearly Billing
              <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1 py-0.5 rounded leading-none">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plansData.map((plan) => {
            const isCurrent = activePlan === plan.id;
            const priceVal = plan.price.replace('$', '');
            const monthlyPrice = parseInt(priceVal);
            const finalPrice = billingPeriod === 'yearly' ? Math.round(monthlyPrice * 0.8) : monthlyPrice;

            return (
              <div 
                key={plan.id}
                className={`glass-panel p-6 rounded-3xl flex flex-col justify-between border relative overflow-hidden ${
                  plan.popular 
                    ? 'border-indigo-500/50 dark:border-indigo-500/50 light:border-indigo-300 bg-indigo-950/10 dark:bg-indigo-950/10 light:bg-indigo-50/20' 
                    : 'border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80'
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                    Popular
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900 capitalize">{plan.name}</h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">{plan.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-slate-100 dark:text-slate-100 light:text-slate-900">${finalPrice}</span>
                    <span className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">/ month</span>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-600">
                        <Check size={14} className="text-indigo-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {isCurrent ? (
                    <div className="w-full text-center py-2.5 rounded-xl bg-slate-900 dark:bg-slate-900 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-500 text-xs font-semibold border border-slate-850 dark:border-slate-850 light:border-slate-200">
                      Active Subscription
                    </div>
                  ) : (
                    plan.popular ? (
                      <PrimaryButton 
                        onClick={() => handleCheckout(plan)}
                        className="w-full py-2.5 text-xs font-semibold rounded-xl text-white"
                      >
                        Upgrade Now
                      </PrimaryButton>
                    ) : (
                      <button
                        onClick={() => handleCheckout(plan)}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Choose Plan
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BILLING HISTORY matrix */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">Billing & Invoice History</h3>
          <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Review your past invoices and transactions ledger</p>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <th className="py-3.5 px-5">Invoice ID</th>
                  <th className="py-3.5 px-5">Billing Date</th>
                  <th className="py-3.5 px-5">Amount Charged</th>
                  <th className="py-3.5 px-5">Transaction Status</th>
                  <th className="py-3.5 px-5 text-right">Invoice Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 dark:divide-slate-850 light:divide-slate-200 text-xs">
                {invoices.map((inv) => (
                  <tr 
                    key={inv.id}
                    className="hover:bg-slate-900/10 dark:hover:bg-slate-900/10 light:hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">{inv.id}</td>
                    <td className="py-3.5 px-5 text-slate-400 dark:text-slate-400 light:text-slate-500">{inv.date}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">{inv.amount}</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button 
                        onClick={() => alert(`Downloading PDF copy of ${inv.id}...`)}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 justify-end ml-auto text-[11px]"
                      >
                        PDF <ArrowUpRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CHECKOUT SIMULATOR OVERLAY */}
      {checkoutPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-xs z-50 p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center space-y-6">
            
            {checkoutStep === 'processing' && (
              <div className="py-8 space-y-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto" />
                <h3 className="text-base font-bold">Processing Transaction...</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Routing request to security check for <strong className="text-slate-200 capitalize">{checkoutPlan.name}</strong> upgrade.
                </p>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="py-4 space-y-5">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles size={26} className="fill-emerald-400/20" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white">Upgrade Successful!</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                    You have successfully upgraded your account tier to <strong className="text-white capitalize">{checkoutPlan.name}</strong>.
                  </p>
                </div>
                <PrimaryButton 
                  onClick={finalizeCheckout}
                  className="w-full py-2.5 text-xs font-semibold rounded-xl text-white"
                >
                  Return to Billing
                </PrimaryButton>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
