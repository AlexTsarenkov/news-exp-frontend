/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(container, element, theme) {
    super(container, element);
    this._theme = theme;
    this._isExpandedLight = false;
    this._menuItems = {
      navContainer: undefined,
      button: undefined,
    };
  }

  render(element, buttonHandler) {
    this.container.innerHTML = '';
    this._element = element;

    this.setEventHandler(buttonHandler.selector, buttonHandler.event);

    if (this._theme === 'light') {
      this.setEventHandler('.menu__expand-button', { eventType: 'click', callback: this._toggledMobileMenuLight.bind(this) });
    } else {
      this.setEventHandler('.menu__expand-button', { eventType: 'click', callback: this._toggleMobileMenuDark.bind(this) });
    }

    this._menuItems.navContainer = this._element.querySelector('.menu__nav-container');
    this._menuItems.button = this._element.querySelector('.menu__expand-button');

    this.container.appendChild(this._element);
  }

  collapseMenu() {
    if (this._isExpanded) {
      this._theme === 'light' ? this._toggledMobileMenuLight() : this._toggleMobileMenuDark();
    }
  }

  _toggleMobileMenuDark() {
    this._element.classList.toggle('menu_is-expanded_theme_dark');
    this._menuItems.navContainer.classList.toggle('menu__nav-container_is-expanded_theme_dark');
    this._menuItems.button.classList.toggle('menu__expand-button_is-expanded');
    this._isExpanded = !this._isExpanded;
  }

  _toggledMobileMenuLight() {
    this._element.classList.toggle('menu_is-expanded_theme_light');
    this._menuItems.navContainer.classList.toggle('menu__nav-container_is-expanded_theme_light');
    this._menuItems.button.classList.toggle('menu__expand-button_is-expanded');
    this._isExpanded = !this._isExpanded;
  }
}
