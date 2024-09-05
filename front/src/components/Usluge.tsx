import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Search, Clock, Bot, Shield, Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Usluge = () => {
    const { darkMode } = useTheme();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.h1
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    AI Automatizacija Emailova
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Mail className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Inteligentni Email Agent</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Automatsko pregledavanje nepročitanih emailova</li>
                            <li>Analiza konteksta i priprema odgovora</li>
                            <li>Korištenje podataka iz vaših dokumenata (PDF, Word, itd.)</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Naš AI agent analizira pristigle emailove i priprema odgovore bazirane na vašim internim dokumentima i politikama.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Search className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Web Pretraživanje</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Automatsko web pretraživanje za nedostajuće informacije</li>
                            <li>Integracija relevantnih web rezultata u odgovore</li>
                            <li>Ažuriranje baze znanja s novim informacijama</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Ako odgovor nije pronađen u vašoj bazi znanja, naš AI agent može izvršiti web pretragu i uključiti relevantne informacije u odgovor.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Bot className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Custom AI Agenti</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>AI agenti trenirani isključivo na podacima vašeg poduzeća</li>
                            <li>Prilagođeni odgovori u skladu s vašim brand tonom i stilom</li>
                            <li>Kontinuirano učenje i poboljšavanje performansi</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Razvijamo custom AI agente koji su trenirani isključivo na vašim podacima, osiguravajući precizne i brendirane odgovore.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Clock className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">24/7 AI Podrška</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Neprekidna obrada i odgovaranje na emailove</li>
                            <li>Automatsko slanje odgovora ili priprema nacrta za pregled</li>
                            <li>Prioritizacija hitnih upita</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Naši AI agenti rade non-stop, osiguravajući brze odgovore na upite u bilo koje doba dana ili noći.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Shield className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Sigurnost i Privatnost</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Enkripcija podataka i sigurno rukovanje informacijama</li>
                            <li>Usklađenost s GDPR i drugim regulativama privatnosti</li>
                            <li>Mogućnost lokalnog hostanja za maksimalnu kontrolu</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Sigurnost vaših podataka je naš prioritet. Implementiramo najnovije sigurnosne protokole za zaštitu vaših emailova i informacija.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                        variants={fadeIn}
                    >
                        <Zap className="h-12 w-12 text-indigo-600 mb-4" />
                        <h2 className="text-2xl font-semibold mb-4">Integracije i Automatizacija</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Integracija s popularnim email klijentima i CRM sustavima</li>
                            <li>Automatsko tagiranje i kategorizacija emailova</li>
                            <li>Generiranje izvještaja i analitika o email komunikaciji</li>
                        </ul>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Naša rješenja se besprijekorno integriraju s vašim postojećim alatima, automatizirajući cijeli proces upravljanja emailovima.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-semibold mb-4">Spremni revolucionirati vašu email komunikaciju?</h2>
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300">
                        Zatražite Demo
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Usluge;