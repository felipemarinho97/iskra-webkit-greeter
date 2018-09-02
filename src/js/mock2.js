import wallpapers from "./../img/wallpapers";

if ((typeof window.lightdm == 'undefined')) {
  window.lightdm = {};

  let lightdm = window.lightdm;
  lightdm.is_authenticated = false;
  lightdm.hostname = "hostname";
  lightdm.can_hibernate = true;
  lightdm.can_suspend = true;
  lightdm.can_restart = true;
  lightdm.can_shutdown = true;
  lightdm.suspend = function () {
    alert("System Suspended. Bye Bye");
  };

  lightdm.hibernate = function () {
    alert("System Hibernated. Bye Bye");
  };

  lightdm.restart = function () {
    alert("System restart. Bye Bye");
  };

  lightdm.shutdown = function () {
    alert("System Shutdown. Bye Bye");
  };

  lightdm.languages = [{ code: "en_US", name: "English(US)", territory: "USA" }, { code: "en_UK", name: "English(UK)", territory: "UK" }];
  lightdm.authenticate = () => { };
  lightdm.cancel_authentication = () => {}
  lightdm.respond = () => { };



}

if ((typeof window.theme_utils == 'undefined')) {
  window.theme_utils = {};

  let theme_utils = window.theme_utils;

  theme_utils.dirlist = () => wallpapers
}
