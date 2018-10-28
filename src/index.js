import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en'; // English
import de from 'react-intl/locale-data/de'; // German
import fr from 'react-intl/locale-data/fr'; // French
import es from 'react-intl/locale-data/es'; // Spanish
import sv from 'react-intl/locale-data/sv'; // Swedish
import no from 'react-intl/locale-data/no'; // Norwegian
import hi from 'react-intl/locale-data/hi'; // Hindi
import lt from 'react-intl/locale-data/lt'; // Lithuanian
import pl from 'react-intl/locale-data/pl'; // Polish
import tr from 'react-intl/locale-data/tr'; // Turkish
import uk from 'react-intl/locale-data/uk'; // Ukrainian
import ru from 'react-intl/locale-data/ru'; // Russian
import it from 'react-intl/locale-data/it'; // Italian
import sr from 'react-intl/locale-data/sr'; // Serbian

import { flattenMessages } from './js/utils'; // flatten messages util function in order to use nested js object for translated texts
import messages from './messages';

import 'moment/locale/es';  
import 'moment/locale/de';  
import 'moment/locale/fr'; 
import 'moment/locale/sv';
import "moment/locale/nb"; 
import 'moment/locale/lt';
import 'moment/locale/pl'; 
import 'moment/locale/tr';
import 'moment/locale/uk'; 
import 'moment/locale/ru'; 
import 'moment/locale/it';
import 'moment/locale/sr';

const localeData = [
  ...en, 
  ...de, 
  ...fr, 
  ...es, 
  ...sv, 
  ...no, 
  ...lt,
  ...pl,
  ...tr, 
  ...uk, 
  ...ru,
  ...hi,
  ...it,
  ...sr,
];


addLocaleData(localeData); // don't forget to add here and spread whatever language that was added ex: ...it 

// constants
const sDefaultLocale = "en"; // could be changed

// vars
let sAttemptedLocale, sLocalFinal; // fallback if the following doesnt work
let oMessages;

// sAttemptedLocale determination
if (window.lightdm.languages.length > 0) {
  sAttemptedLocale = window.lightdm.languages[0].code.split(".")[0]; // determine language from lightDM --> take 5 chaarcter ISO code (ex. en_US, es_ES)
} else {
  sAttemptedLocale = sDefaultLocale; // fallback attempted locale
}

// messages determination
if (messages[sAttemptedLocale]) { // optimum case: full locale is found in messages object, ex: en_US, en_UK, de_DE, de_AT etc.
  oMessages = messages[sAttemptedLocale];
  sLocalFinal = sAttemptedLocale;
}
else if (messages[sAttemptedLocale.substring(0, 2)]) { // second-best case, the langauge by itself is found as a key "en" or "de"
  oMessages = messages[sAttemptedLocale.substring(0, 2)]; // key found for sAttemptedLocale of language
  sLocalFinal = sAttemptedLocale.substring(0, 2); // also need to update final locale for consistency 
} else {
  oMessages = messages[sDefaultLocale]; // key not found; use english: "en"
  sLocalFinal = sDefaultLocale; // also need to update locale
}

ReactDOM.render(
  <IntlProvider locale={sLocalFinal} messages={flattenMessages(oMessages)}>
    <App locale={sLocalFinal}/>
  </IntlProvider>
  , document.getElementById('root')
);
registerServiceWorker();
