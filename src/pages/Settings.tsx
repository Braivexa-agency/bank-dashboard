import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ResponsivePageWrapper from '@/components/ResponsivePageWrapper';
import './Settings.css';

interface UserSettings {
  name: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  preferences: {
    currency: string;
    language: string;
    theme: string;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    preferences: {
      currency: 'USD',
      language: 'en',
      theme: 'light',
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (type: keyof UserSettings['notifications']) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handlePreferenceChange = (type: keyof UserSettings['preferences'], value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value,
      },
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving settings:', settings);
    setIsEditing(false);
  };

  return (
    <ResponsivePageWrapper>
      <div className="settings-page">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
        </div>

        <div className="settings-content">
          <div className="settings-section responsive-card">
            <div className="section-header">
              <h2>Profile Information</h2>
              <Button 
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            
            <div className="responsive-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>
            
            {isEditing && (
              <div className="mt-4">
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="settings-section responsive-card">
            <h2>Notification Preferences</h2>
            
            <div className="notification-group">
              <div className="notification-item">
                <div>
                  <h4>Email Notifications</h4>
                  <p>Receive account updates via email</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div>
                  <h4>SMS Notifications</h4>
                  <p>Receive transaction alerts via SMS</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div>
                  <h4>Push Notifications</h4>
                  <p>Receive in-app notifications</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="settings-section responsive-card">
            <h2>Display Preferences</h2>
            
            <div className="responsive-form">
              <div className="form-group">
                <label>Currency</label>
                <select
                  value={settings.preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="form-input"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="form-input"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Theme</label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                  className="form-input"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsivePageWrapper>
  );
};

export default Settings;