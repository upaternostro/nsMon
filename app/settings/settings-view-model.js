// Copyright Ugo Paternostro 2023, 2024. Licensed under the EUPL-1.2 or later.
import { ApplicationSettings, Observable } from '@nativescript/core'

export class SettingsViewModel extends Observable {
  static #_instance;

  static getInstance() {
      if (SettingsViewModel.#_instance == null) {
        SettingsViewModel.#_instance = new SettingsViewModel();
      }

      return SettingsViewModel.#_instance;
  }
  
  #oldUrl;
  #oldUsername;
  #oldPassword;
  #oldAutoRefresh;
  #oldSelectedInterval;
  #oldNotifications;
  #url;
  #username;
  #password;
  #autoRefresh;
  #intervals = [
    "30 secs",
    "1 minute",
    "2 minutes",
    "5 minutes",
    "10 minutes",
    "15 minutes",
  ];
  #selectedInterval;
  #notifications;

  static getSelectedIntervalMillis() {
  // console.log('getSelectedIntervalMillis');
    switch (ApplicationSettings.getNumber("selectedInterval", 3)) {
      case 0:
        return 30000;
      case 1:
        return 60000;
      case 2:
        return 120000;
      case 3:
      default:
        return 300000;
      case 4:
        return 600000;
      case 5:
        return 900000;
    }
  }

  constructor() {
    super();

    this.#oldUrl = ApplicationSettings.getString("url");
    this.#oldUsername = ApplicationSettings.getString("username");
    this.#oldPassword = ApplicationSettings.getString("password");
    this.#oldAutoRefresh = ApplicationSettings.getBoolean("autoRefresh", false);
    this.#oldSelectedInterval = ApplicationSettings.getNumber("selectedInterval", 3);
    this.#oldNotifications = ApplicationSettings.getBoolean("notifications", false);
    this.#url = this.#oldUrl;
    this.#username = this.#oldUsername;
    this.#password = this.#oldPassword;
    this.#autoRefresh = this.#oldAutoRefresh;
    this.#selectedInterval = this.#oldSelectedInterval;
    this.#notifications = this.#oldNotifications;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }

  get url() {
    return this.#url;
  }

  get username() {
    return this.#username;
  }

  get password() {
    return this.#password;
  }

  get autoRefresh() {
    return this.#autoRefresh;
  }

  get intervals() {
    return this.#intervals;
  }

  get selectedInterval() {
    return this.#selectedInterval;
  }

  get notifications() {
    return this.#notifications;
  }

  isUrlModified() {
    return this.#oldUrl != this.#url;
  }

  isUsernameModified() {
    return this.#oldUsername != this.#username;
  }

  isPasswordModified() {
    return this.#oldPassword != this.#password;
  }

  isAutoRefreshModified() {
    return this.#oldAutoRefresh != this.#autoRefresh;
  }

  isSelectedIntervalModified() {
    return this.#oldSelectedInterval != this.#selectedInterval;
  }

  isNotificationsModified() {
    return this.#oldNotifications != this.#notifications;
  }

  isUrlValid() {
    return this.#url != null && this.#url.length > 0;
  }

  isUsernameValid() {
    return this.#username != null && this.#username.length > 0;
  }

  isPasswordValid() {
    return true;
  }

  isAutoRefreshValid() {
    return true;
  }

  isSelectedIntervalValid() {
    return true;
  }

  isNotificationsValid() {
    return true;
  }

  isSaveEnabled() {
// console.log('saveEnabled: ' + ((this.isUrlModified() || this.isUsernameModified() || this.isPasswordModified() || this.isAutoRefreshModified() || this.isSelectedIntervalModified() || this.isNotificationsModified()) &&
// (this.isUrlValid() && this.isUsernameValid() && this.isPasswordValid() && this.isAutoRefreshValid() && this.isSelectedIntervalValid() && this.isNotificationsValid())));
    return (this.isUrlModified() || this.isUsernameModified() || this.isPasswordModified() || this.isAutoRefreshModified() || this.isSelectedIntervalModified() || this.isNotificationsModified()) &&
           (this.isUrlValid() && this.isUsernameValid() && this.isPasswordValid() && this.isAutoRefreshValid() && this.isSelectedIntervalValid() && this.isNotificationsValid());
  }

  set url(url) {
    this.#url = url;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }

  set username(username) {
    this.#username = username;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }

  set password(password) {
    this.#password = password;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }
  
  set autoRefresh(autoRefresh) {
    this.#autoRefresh = autoRefresh;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }
    
  set selectedInterval(selectedInterval) {
    this.#selectedInterval = selectedInterval;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }
    
  set notifications(notifications) {
    this.#notifications = notifications;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }

  persistConfig() {
    ApplicationSettings.setString("url", this.#url);
    ApplicationSettings.setString("username", this.#username);
    ApplicationSettings.setString("password", this.#password);
    ApplicationSettings.setBoolean("autoRefresh", this.#autoRefresh);
    ApplicationSettings.setNumber("selectedInterval", this.#selectedInterval);
    ApplicationSettings.setBoolean("notifications", this.#notifications);
    this.#oldUrl = this.#url;
    this.#oldUsername = this.#username;
    this.#oldPassword = this.#password;
    this.#oldAutoRefresh = this.#autoRefresh;
    this.#oldSelectedInterval = this.#selectedInterval;
    this.#oldNotifications = this.#notifications;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }
}