export default class HelperFunctions {
  constructor() {}
  static capitalizeText = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

  static handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
}
