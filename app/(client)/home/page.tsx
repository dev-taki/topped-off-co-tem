'use client';

import { useEffect } from 'react';
import { Plus, Calendar, CreditCard, Users, Home, User, Clock, Gift } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useRouter } from 'next/navigation';
import { fetchUserSubscriptions } from '../../store/slices/subscriptionSlice';
import { AuthService } from '../../services/authService';
import { Logo } from '../../components/Logo';
import PWAInstall from '../../components/PWAInstall';
import { COLORS } from '../../config/colors';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { userSubscriptions, loading: subscriptionsLoading } = useAppSelector((state) => state.subscription);

  useEffect(() => {
    // Check authentication first
    const token = AuthService.getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    dispatch(fetchUserSubscriptions(AuthService.getBusinessId()));
  }, [dispatch, router]);



  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background.secondary }}>
      {/* Full Width Welcome Banner */}
      <div className="w-full p-6 relative overflow-hidden animate-gradient-flow rounded-b-3xl border-b-4" style={{ backgroundColor: COLORS.primary.main, color: COLORS.success.text, borderColor: COLORS.success.text }}>
        {/* Animated Floral Watermark Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 animate-float-slow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-spin-slow">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute top-8 right-8 w-12 h-12 animate-float-medium">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-pulse">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-6 left-12 w-10 h-10 animate-float-fast">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-bounce-slow">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-8 right-6 w-14 h-14 animate-float-slow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-spin-reverse">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 animate-float-medium">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-spin-slow">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 animate-float-fast">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full animate-pulse">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-md mx-auto text-center relative z-10">
          <div className="mb-4">
            <Logo variant="default" color="white" size="lg" className="mb-4" />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.success.text }}>Welcome Back, {user?.name || 'Adventurer'}!</h1>
          <p style={{ color: COLORS.success.text, opacity: 0.8 }}>Ready to continue your adventure?</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="p-6 pb-24">

        {/* Active Subscriptions */}
        {userSubscriptions && userSubscriptions.length > 0 && (
          <div className="rounded-xl p-6 shadow-sm border mb-6" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.text.primary }}>Your Active Subscriptions</h2>
            <div className="space-y-4">
              {userSubscriptions
                .filter(sub => sub.status === 'ACTIVE')
                .map((subscription) => (
                  <div key={subscription.id} className="rounded-xl p-5 border" style={{ backgroundColor: '#DCFCE7', borderColor: COLORS.success.main }}>
                    {/* Header with Plan Name and Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.success.main }}>
                          <CreditCard className="h-6 w-6" style={{ color: COLORS.success.text }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: COLORS.text.primary }}>
                            {subscription.plan_variation?.name || 'Subscription Plan'}
                          </h3>
                          <p className="text-sm" style={{ color: COLORS.text.secondary }}>
                            {subscription.cadence.charAt(0) + subscription.cadence.slice(1).toLowerCase()} • ${(subscription.subscription_amount / 100).toFixed(2)}/{subscription.cadence === 'DAILY' ? 'day' : subscription.cadence === 'WEEKLY' ? 'week' : subscription.cadence === 'MONTHLY' ? 'month' : subscription.cadence === 'YEARLY' ? 'year' : 'period'}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: COLORS.success.main, color: COLORS.success.text }}>
                        ACTIVE
                      </span>
                    </div>
                    
                    {/* Variation Image */}
                    {(subscription.plan_variation as any)?.image_link && (subscription.plan_variation as any).image_link.trim() !== '' && (
                      <div className="mb-4">
                        <img 
                          src={(subscription.plan_variation as any).image_link} 
                          alt={subscription.plan_variation?.name || 'Plan variation'} 
                          className="w-full h-48 object-cover rounded-lg border"
                          style={{ borderColor: COLORS.border.primary }}
                          onError={(e) => {
                            // Hide image if it fails to load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {/* Plan Description */}
                    {subscription.plan_variation?.description && (
                      <div 
                        className="mb-4 text-sm rounded-lg p-3" 
                        style={{ backgroundColor: COLORS.background.primary, color: COLORS.text.secondary }}
                        dangerouslySetInnerHTML={{ __html: subscription.plan_variation.description }}
                      />
                    )}
                    
                    {/* Credits Display */}
                    <div className={`${subscription.plan_variation?.gift_credit ? 'grid grid-cols-2 gap-3' : ''} mb-4`}>
                      <div className="rounded-lg p-3 border" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.success.main }}>
                        <div className="flex items-center space-x-2 mb-1">
                          <CreditCard className="h-4 w-4" style={{ color: COLORS.success.main }} />
                          <span className="text-xs font-medium" style={{ color: COLORS.text.secondary }}>Subscriber Credits</span>
                        </div>
                        <div className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>{subscription.available_credit}</div>
                        <p className="text-xs mt-1" style={{ color: COLORS.text.secondary }}>
                          {subscription.plan_variation?.credit && `${subscription.plan_variation.credit} included`}
                        </p>
                      </div>
                      
                      {/* Gift Credits - Only show if actual gift_credit > 0 */}
                      {subscription.gift_credit > 0 && (
                        <div className="rounded-lg p-3 border" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.success.main }}>
                          <div className="flex items-center space-x-2 mb-1">
                            <Gift className="h-4 w-4" style={{ color: COLORS.success.main }} />
                            <span className="text-xs font-medium" style={{ color: COLORS.text.secondary }}>Guest Credits</span>
                          </div>
                          <div className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>{subscription.gift_credit}</div>
                          <p className="text-xs mt-1" style={{ color: COLORS.text.secondary }}>
                            {subscription.plan_variation?.gift_credit && `${subscription.plan_variation.gift_credit} included`}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Daily Redemption Status */}
                    {subscription.daily_redemption_active && (
                      <div className="rounded-lg p-3 border mb-4" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.primary.main }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" style={{ color: COLORS.primary.main }} />
                            <span className="text-sm font-medium" style={{ color: COLORS.text.primary }}>Daily Redemption:</span>
                          </div>
                          <span className="text-sm font-bold" style={{ color: COLORS.primary.main }}>
                            {subscription.redemption_quantity}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Subscription Dates */}
                    <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: COLORS.border.primary }}>
                      <div>
                        <span style={{ color: COLORS.text.secondary }}>Started: </span>
                        <span style={{ color: COLORS.text.primary }} className="font-medium">
                          {new Date(subscription.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: COLORS.text.secondary }}>Renews: </span>
                        <span style={{ color: COLORS.text.primary }} className="font-medium">
                          {new Date(subscription.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* No Active Subscriptions */}
        {(!userSubscriptions || userSubscriptions.filter(sub => sub.status === 'ACTIVE').length === 0) && !subscriptionsLoading && (
          <div className="rounded-xl p-6 shadow-sm border mb-6 text-center" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: COLORS.secondary.main + '20' }}>
              <Calendar className="h-8 w-8" style={{ color: COLORS.secondary.main }} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.text.primary }}>No Active Subscriptions</h3>
            <p className="text-sm mb-4" style={{ color: COLORS.text.secondary }}>
              Subscribe to a membership plan to unlock exclusive benefits and credits!
            </p>
            <button 
              onClick={() => router.push('/plans')}
              className="px-6 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: COLORS.secondary.main, color: COLORS.success.text }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View Available Plans
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => router.push('/redeem')}
            className="rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow w-full text-left"
            style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.primary.main}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border.primary}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: COLORS.primary.main }}>
              <Plus className="h-6 w-6" style={{ color: COLORS.success.text }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color: COLORS.text.primary }}>Redeem</h3>
            <p className="text-sm" style={{ color: COLORS.text.secondary }}>Start a new adventure</p>
          </button>
          
          <button 
            onClick={() => router.push('/plans')}
            className="rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow w-full text-left"
            style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = COLORS.secondary.main}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = COLORS.border.primary}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: COLORS.secondary.main }}>
              <Calendar className="h-6 w-6" style={{ color: COLORS.success.text }} />
            </div>
            <h3 className="font-semibold mb-1" style={{ color: COLORS.text.primary }}>Available Plans</h3>
            <p className="text-sm" style={{ color: COLORS.text.secondary }}>View subscription plans</p>
          </button>
        </div>

        {/* Stats */}
        <div className={`grid gap-4 ${userSubscriptions?.some(sub => sub.plan_variation?.gift_credit) ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <div className="rounded-xl p-4 text-center shadow-sm border" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}>
            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.text.primary }}>
              {userSubscriptions ? userSubscriptions.reduce((total, sub) => total + sub.available_credit + sub.gift_credit, 0) : 0}
            </div>
            <div className="text-xs" style={{ color: COLORS.text.secondary }}>Total Credits</div>
          </div>
          <div className="rounded-xl p-4 text-center shadow-sm border" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}>
            <div className="text-2xl font-bold mb-1" style={{ color: COLORS.text.primary }}>
              {userSubscriptions ? userSubscriptions.reduce((total, sub) => total + sub.available_credit, 0) : 0}
            </div>
            <div className="text-xs" style={{ color: COLORS.text.secondary }}>Subscriber Credits</div>
          </div>
          {userSubscriptions?.some(sub => sub.plan_variation?.gift_credit) && (
            <div className="rounded-xl p-4 text-center shadow-sm border" style={{ backgroundColor: COLORS.background.primary, borderColor: COLORS.border.primary }}>
              <div className="text-2xl font-bold mb-1" style={{ color: COLORS.text.primary }}>
                {userSubscriptions ? userSubscriptions.reduce((total, sub) => total + sub.gift_credit, 0) || "" : ""}
              </div>
              <div className="text-xs" style={{ color: COLORS.text.secondary }}>Guest Credits</div>
            </div>
          )}
        </div>
      </div>

      {/* PWA Install Prompt - Only show after login */}
      <PWAInstall showAfterAuth={true} />
    </div>
  );
}
