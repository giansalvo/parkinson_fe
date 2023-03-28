import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
            menu: {
                p1: "Home",
                p2: "About",
                p3: "Contact",
                p4: "Credits",
                p5: "Services",
                p5_1: "Dashboard",
                p5_2: "Prediction",
                p5_3: "Add Annotation",
                p5_4: "Export Data",
                p6: "Login"
            },
            welcome_message: {
                p1: "Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson\'s patients. You can either",
                p2: " give it a try ",
                p3: " or ",
                p4: " register ",
                p5: " to participate to the project and send new images. In this case you will help us develop a more performant system.",
            },
            description: {
                part1: 'Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson\'s patients. You can either <Link to="/Prediction">give it a try</Link> or <Link to="/SignIn">register</Link> to participate to the project and send new images. In this case you will help us develop a more performant system.',
                part2: 'Learn React'
          }
        }
    },
        it: {
            translation: {
                menu: {
                    p1: "Home",
                    p2: "Il progetto",
                    p3: "Contatti",
                    p4: "Crediti",
                    p5: "Servizi",
                    p5_1: "Cruscotto",
                    p5_2: "Predici",
                    p5_3: "Aggiungi dati",
                    p5_4: "Esporta dati",
                    p6: "Login"
                },
                welcome_message: {
                    p1: "Benvenuto! Questo sito web usa una rete neurale che sfrutta l'intelligenza artificiale Intelligence per identificare e evidenziare la Substantia Nigra (SN) che si trova nei pazienti affetti dalla sindrome di Parkinson.und in Parkinson\'s patients. Su questo sito puoi",
                    p2: " provare una dimostrazione ",
                    p3: " oppure ",
                    p4: " registrarti al sito ",
                    p5: " per partecipare al progetto mandando nuove immagini. In questo caso aiuterai a sviluppare un sistema più efficiente.",
                },
                description: {
                    part1: 'Welcome! This website uses a Neural Network Artificial Intelligence to identify and highlight the Substantia Nigra found in Parkinson\'s patients. You can either <Link to="/Prediction">give it a try</Link> or <Link to="/SignIn">register</Link> to participate to the project and send new images. In this case you will help us develop a more performant system.',
                    part2: 'Learn React'
              }
            }
      }
    }
});

export default i18n;