import { ApplicationSettings, Observable } from '@nativescript/core'

export class SettingsViewModel extends Observable {
  #oldUrl;
  #oldUsername;
  #oldPassword;
  #url;
  #username;
  #password;

  constructor() {
    super();

    this.#oldUrl = ApplicationSettings.getString("url");
    this.#oldUsername = ApplicationSettings.getString("username");
    this.#oldPassword = ApplicationSettings.getString("password");
    this.#url = this.#oldUrl;
    this.#username = this.#oldUsername;
    this.#password = this.#oldPassword;
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

  isUrlModified() {
    return this.#oldUrl != this.#url;
  }

  isUsernameModified() {
    return this.#oldUsername != this.#username;
  }

  isPasswordModified() {
    return this.#oldPassword != this.#password;
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

  isSaveEnabled() {
    return (this.isUrlModified() || this.isUsernameModified() || this.isPasswordModified()) &&
           (this.isUrlValid() && this.isUsernameValid() && this.isPasswordValid());
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

  persistConfig() {
    ApplicationSettings.setString("url", this.#url);
    ApplicationSettings.setString("username", this.#username);
    ApplicationSettings.setString("password", this.#password);
    this.#oldUrl = this.#url;
    this.#oldUsername = this.#username;
    this.#oldPassword = this.#password;
    this.notifyPropertyChange('saveEnabled', this.isSaveEnabled());
  }
}