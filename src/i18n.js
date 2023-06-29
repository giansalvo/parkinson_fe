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
            about: {
                p1: "This project is the result of a PhD research in the course of Lifesciences and Biotechnologies at",
                p2: "University of Sassari",
                p3: "Our aim is to design and build a Computer Aided Detection (CAD) system that could perform automatic Parkinson's disease (PD) detection as efficiently as a human expert.",
                p4: "In this study we developed a segmentation framework that uses only well-known, existing network model, with a good trade off between performance and resource consumption.",
                p5: "The framework is able to segment the Substantia Nigra, found in 90% of Parkinson's patients."
            },
            contact: {
                p1: "We would like to build a bigger dataset. For this raison we are open for collaborations with other researchers and doctors. ",
                p2: "For futher information about artificial intelligence applied to Parkinson's disease early detection or for participating to this project, please send an email to: ",
                p3: "g.gusinu@phd.uniss.it"
            },
            credits: {
                p1: "This research was developed by Dr Giansalvo Gusinu, Dr Claudia Frau, Prof. Giuseppe A. Trunfio, Prof. Paolo Solla and Prof. Leonardo A. Sechi at ",
                p2: "University of Sassari",
                p3: "The website was realized in collaboration with the company ",
                p4: " Abinsula ",
                p5: ", one of the main Italian players in Embedded, IoT, Web and Mobile solutions. ",
                p6: "The funds for the scholarship of Dr Giansalvo Gusinu were obtained from Italian Ministry of Education through ",
                p7: "PON project 2014-2020"
            },
            dashboard: {
                p1: "Patient ID",
                // p2: "Title",
                p3: "Notes",
                p4: "Age onset",
                p5: "Sex",
                p6: "Birth Date",
                p7: "Visit Date",
                p8: "SN right",
                p9: "SN left",
                p10: "User ID",
                p11: "Visit Date",
                p12: "from ",
                p13: "to ",
                p14: "Birth date ",
                p15: "from ",
                p16: "to ",
                p17: "Sex ",
                p18: "SN right ",
                p19: "SN left ",
                p20: "All   ",
                p21: "Male  ",
                p22: "Female",
                p23: "Reset Table",            
            },
            prediction: {
                p1: "Choose an image of the midbrain and send it to the server. ",
                p2: "The artificial intelligence software will give back an image where the Substantia Nigra is highlighted in red. ",
                p3: "Midbrain image ",
                p4: "Substantia Nigra (in red)",
                p5: "Image:"
            },        
            add_annotation: {
                p1: "Midbrain Untraced Image ",
                p2: "Traced Image ",
                // p3: "Title",
                p4: "Notes",
                p5: "User ID",
                p6: "Patient ID",
                p7: "Visit Date",
                p8: "Age at onset",
                p9: "Birth Date",
                p10: "SN right",
                p11: "SN left",
                p12: "Sex ",
                p13: "Male",
                p14: "Female",
                p15: "All fields are required",
                p16: "Untraced image",
                p17: "Traced image"
            },
            export: {
                p1: "Here you can download all data records. The download should start shortly and take just a few seconds.",
                p2: "This data should be used only for research purposes. ",
                p3: "By clicking the following button you agree to these Terms & Conditions. ",
                p4: "Export Data"
            },        
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
                    p1: "Benvenuto! Questo sito web usa una rete neurale che sfrutta l'intelligenza artificiale per identificare e evidenziare la Substantia Nigra (SN) che si trova nei pazienti affetti dalla sindrome di Parkinson. Su questo sito puoi",
                    p2: " provare una dimostrazione ",
                    p3: " oppure ",
                    p4: " registrarti ",
                    p5: " per partecipare al progetto mandando nuove immagini. In questo caso aiuterai a sviluppare un sistema più efficiente.",
                },
                about: {
                    p1: "Questo progetto è il risultato di una ricerca di dottorato del corso di Scienze della vita e biotenologie della",
                    p2: "Università di Sassari",
                    p3: "Il nostro obiettivo è disegnare e realizzare un sistema diagnostico automatizzato (CAD) che possa diagnosticare la malattia di Parkinson in maniera efficiente quanto un clinico esperto.",
                    p4: "In questo studio è stata sviluppata una piattaforma per la segmentazione della Substantia Nigra (SN) che usa solo modelli ben conosciuti di Reti Neurali, che mostrano un buon compromesso tra efficienza e risorse. ",
                    p5: "La piattaforma è capace di segmentare la Substantia Nigra, che si trova nel 90% dei pazienti affetti dalla sindrome di Parkinson."
                },
                contact: {
                    p1: "Ci piacerebbe aumentare la dimensione del nostro dataset con nuovi dati e immagini. Per questa ragione siamo aperti a collaborazioni con altri ricercatori e clinici interessati al progetto. ",
                    p2: "Per maggiori informazioni circa l'intelligenza artificiale applicata alla diagnosi precoce della malattia di Parkinson o per partecipare a questo progetto, vi invitiamo a mandare una email all'indirizzo: ",
                    p3: "g.gusinu@phd.uniss.it"
                },
                credits: {
                    p1: "Questa ricerca è stata condotta da Dr Giansalvo Gusinu, Dr Claudia Frau, Prof. Giuseppe A. Trunfio, Prof. Paolo Solla e dal Prof. Leonardo A. Sechi alla ",
                    p2: "Università di Sassari",
                    p3: "Il sito web è stato realizzato in collaborazione con la società ",
                    p4: " Abinsula ",
                    p5: ", uno dei maggiori player italiani nei campi della tecnologia Embedded, IoT, Web e soluzioni mobile. ",
                    p6: "I fondi per la formazione del Dr Giansalvo Gusinu sono stati ottenuti dal Ministero Italiano dell'Università e Ricerca attraverso il ",
                    p7: "PON project 2014-2020"
                },  
                dashboard: {
                    p1: "ID Paziente",
                    // p2: "Titolo",
                    p3: "Note",
                    p4: "Età onset",
                    p5: "Sesso",
                    p6: "Data nascita",
                    p7: "Data visita",
                    p8: "SN destra",
                    p9: "SN sinistra",
                    p10: "ID Utente",
                    p11: "Data visita",
                    p12: "da",
                    p13: "a",
                    p14: "Data nascita ",
                    p15: "da ",
                    p16: "a ",
                    p17: "Sesso ",
                    p18: "SN destra",
                    p19: "SN sinistra",
                    p20: "Tutti",
                    p21: "Maschio",
                    p22: "Femmina",
                    p23: "Reimposta tabella",
                },
                prediction: {
                    p1: "Scegli un'immagine del mesencefalo e inviala al server. ",
                    p2: "Il software di intelligenza artificiale restituirà un immagine dove la Substantia Nigra è evidenziata in rosso. ",
                    p3: "Immagine del mesencefalo ",
                    p4: "Substantia Nigra (in rosso)",
                    p5: "Immagine:"
                },
                add_annotation: {
                    p1: "Immagine del mesencefalo",
                    p2: "Immagine con traccia ",
                    // p3: "Titolo",
                    p4: "Note",
                    p5: "ID utente",
                    p6: "ID paziente",
                    p7: "Data visita",
                    p8: "Età onset",
                    p9: "Data nascita",
                    p10: "SN destra",
                    p11: "SN sinistra",
                    p12: "Sesso ",
                    p13: "Maschio",
                    p14: "Femmina",
                    p15: "Tutti i campi sono obbligatori",
                    p16: "Immagine non tracciata",
                    p17: "Immagine con traccia"
                },
                export: {
                    p1: "Da questo pannello è possibile esportare e scaricare tutti i dati registrati. Il download dovrebbe iniziare a breve e durare qualche secondo.",
                    p2: "Tali dati dovrebbero essere usati solo per fini di ricerca.",
                    p3: "Cliccando il seguente bottone si accettano implicitamente questi termini e condizioni d'uso.",
                    p4: "Esporta Dati"
                },        
            }
        }
    }
});

export default i18n;