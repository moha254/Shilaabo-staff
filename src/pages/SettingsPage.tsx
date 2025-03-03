import React from 'react';
import Header from '../components/Header';
import { Settings, User, CreditCard, Shield, Bell } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const settingsSections = [
    {
      title: 'Account Settings',
      icon: <User size={20} className="text-blue-500" />,
      description: 'Manage your account information and preferences',
    },
    {
      title: 'Payment Methods',
      icon: <CreditCard size={20} className="text-green-500" />,
      description: 'Add and manage payment methods',
    },
    {
      title: 'Security',
      icon: <Shield size={20} className="text-purple-500" />,
      description: 'Update your password and security settings',
    },
    {
      title: 'Notifications',
      icon: <Bell size={20} className="text-orange-500" />,
      description: 'Configure email and system notifications',
    },
  ];

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto">
      <Header title="Settings" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Settings size={24} className="mr-2 text-blue-500" />
            System Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingsSections.map((section, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => alert('This feature is under development')}
              >
                <div className="flex items-center mb-2">
                  {section.icon}
                  <h3 className="text-lg font-medium text-gray-800 ml-2">{section.title}</h3>
                </div>
                <p className="text-gray-600">{section.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">About Shilaabo Tour and Car Hire</h3>
            <p className="text-gray-600 mb-4">
              Version 1.0.0 | © 2025 Shilaabo Tour and Car Hire
            </p>
            <p className="text-gray-600">
              This admin dashboard helps you manage customer bookings, track payments, and monitor your tour and car hire business efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;