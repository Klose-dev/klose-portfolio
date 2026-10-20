import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

export const navigationLabels = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    skills: 'Skills',
    portfolio: 'Portfolio',
    projects: 'Projects',
    contact: 'Contact',
  },
  fr: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Services',
    skills: 'Compétences',
    portfolio: 'Portfolio',
    projects: 'Projets',
    contact: 'Contact',
  },
}

const translations = {
  en: {
    common: {
      mainNavigation: 'Main navigation',
      languageSelection: 'Language selection',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
      lightMode: 'Light mode',
      darkMode: 'Dark mode',
      loading: 'Loading',
      loadingPortfolio: 'Loading portfolio',
    },
    hero: {
      availability: 'Available for work', greeting: 'Hello, I am',
      paragraphs: [
        'A passionate web developer who loves creating beautiful and functional digital experiences with innovation.',
        'Specializing in modern web technologies and user centered design solutions.',
        'Building responsive applications that combine creativity with cutting edge technology.',
        'Transforming ideas into interactive digital realities through code and design.',
      ],
      stats: ['Featured Projects', 'Core Roles', 'Technologies Used'],
      projects: 'Featured Projects', roles: 'Core Roles', technologies: 'Technologies Used', download: 'Download CV', viewProjects: 'View Projects',
    },
    about: {
      heading: 'About', accent: 'Me', tag: 'Full Stack Developer',
      intro: 'I am Akongseh Klose, a passionate software engineering student who loves transforming ideas into elegant, functional web experiences.',
      bio: 'With a strong foundation in both front end and backend development, I craft digital products that are not only visually stunning but also performant and user centric. I am constantly learning, building, and pushing boundaries in the world of web development.',
      name: 'Name', location: 'Location', freelance: 'Freelance', available: 'Available', experience: 'Years Experience', download: 'Download CV',
    },
    services: {
      heading: 'My', accent: 'Services', webTitle: 'Web Development', webDesc: 'Building robust, scalable web applications using modern technologies like React, PHP, Laravel and MySQL with clean, maintainable code architecture.',
      maintenanceTitle: 'Website Maintenance', maintenanceDesc: 'Keeping your web presence optimized, secure, and up to date. From bug fixes to performance enhancements and regular content updates.',
      designTitle: 'Web Design', designDesc: 'Designing visually stunning, user-focused interfaces with careful attention to typography, color theory, spacing, and responsive layouts.',
    },
    skills: {
      heading: 'Skills',
      stackHeading: 'Stack',
      categories: { frontend: 'Frontend', backend: 'Backend & Data', tools: 'Tools' },
    },
    particleShowcase: {
      heading: 'Ideas, in formation',
      description: 'A little code, a little creativity, and a lot of possibility.',
    },
    portfolio: {
      kicker: 'Selected work', heading: 'Featured', accent: 'Projects',
      intro: 'A few builds that show the range of the work, from AI powered tools to polished web experiences and full stack product ideas.',
      hover: 'Hover to reveal details', tap: 'Tap to reveal details', overview: 'Project overview', view: 'View Project',
      projects: [
        { title: 'Face Recognition Attendance', category: 'AI/ML', description: 'Advanced facial recognition system for automated attendance tracking in educational institutions.' },
        { title: 'AI Chat Bot', category: 'AI App', description: 'Python driven AI chatbot with NLP workflows, intelligent responses, and support automation for user conversations.' },
        { title: 'IdeaMarket', category: 'Blockchain Project', description: 'A blockchain powered marketplace for ideas, built with Python and modern decentralized workflows to support transparent ownership and collaboration.' },
        { title: 'E Commerce Store', category: 'Web Design', description: 'Modern e commerce UI with cart, checkout and product management.' },
        { title: 'Admin Dashboard', category: 'Dashboard', description: 'Admin dashboard built with Python and JavaScript for analytics, reporting, and clear role based management.' },
        { title: 'Blog Platform', category: 'CMS', description: 'Content management system with rich editor, SEO tools and comments.' },
      ],
    },
    testimonials: { heading: 'What People', accent: 'Say' },
    contact: {
      heading: 'Contact', accent: 'Me', title: "Let's work together", description: "Have a project in mind or want to discuss an opportunity? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.",
      fullName: 'Full Name', emailAddress: 'Email Address', phoneNumber: 'Phone Number', subject: 'Subject', message: 'Your Message', send: 'Send Message', sent: 'Sent!', error: 'Please fill in all fields before sending.', hint: 'Your message will open in WhatsApp and be sent to +237 671 313 884.', location: 'Location',
      email: 'Email', whatsapp: 'WhatsApp', messageIntro: 'New portfolio message from',
    },
    footer: {
      tagline: 'Building beautiful, functional web experiences from Yaoundé, Cameroon. Open to freelance and full time opportunities.',
      quickLinks: 'Quick Links', services: 'Services', getInTouch: 'Get In Touch', rights: 'All rights reserved.',
      backToTop: 'Back to top',
      serviceList: ['Web Development', 'Website Maintenance', 'Web Design', 'UI/UX Design', 'Backend Development'],
    },
    faq: {
      heading: 'FAQ',
      items: [
        { q: 'What technologies do you specialize in?', a: 'I specialize in React, PHP, Laravel, MySQL, JavaScript, Python, and modern web technologies. I build full-stack applications with clean, maintainable code.' },
        { q: 'Are you available for freelance work?', a: 'Yes, I am open to freelance projects and full-time opportunities. Feel free to reach out via the contact form or WhatsApp.' },
        { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a full-stack application could take 2-3 months or more.' },
        { q: 'Do you provide maintenance after launch?', a: 'Absolutely. I offer ongoing maintenance packages including bug fixes, performance optimization, security updates, and feature enhancements.' },
        { q: 'What is your development process?', a: 'My process: Discovery & Planning → Design & Prototyping → Development → Testing & QA → Launch → Post-launch Support. I keep you involved at every stage.' },
        { q: 'Can you work with my existing team?', a: 'Yes, I can seamlessly integrate with existing teams. I follow standard Git workflows, code review practices, and agile methodologies.' },
      ],
    },
    caseStudy: {
      eyebrow: 'Featured Project', heading: 'Face Recognition', accent: 'Attendance System',
      problemLabel: 'Problem:',
      problem: 'An advanced face recognition based attendance system designed for company employees. It streamlines attendance tracking, enhances security, and reduces manual errors by automatically recording employee presence using facial identification.',
      roles: [
        { title: 'Employee Registration', description: 'Employees register in the system with their facial biometric data securely stored. The system captures multiple face angles for accurate recognition.' },
        { title: 'Attendance Tracking', description: 'Real time attendance recording through facial recognition as employees enter the office. Instant notifications sent to managers and administrators.' },
        { title: 'Analytics & Reporting', description: 'Comprehensive attendance reports with AI powered insights. Historical data analysis, patterns, and predictive warnings for employees who may be at risk.' },
      ],
      builtWith: 'Built with:', liveDemo: 'Live Demo', viewCode: 'View Code',
    },
    whatsapp: { label: 'WhatsApp', aria: 'Jump to contact form', title: 'Contact via WhatsApp' },
    testimonials: {
      heading: 'What People', accent: 'Say',
      entries: [
        { role: 'Field Supervisor YIBS', text: "Klose's ability to transform complex requirements into elegant, functional web solutions is remarkable. IdeaMarket is a testament to his technical skill and creative vision." },
        { role: 'Academic Supervisor YIBS', text: 'An outstanding student whose dedication to software engineering goes beyond the classroom. His project demonstrates real world problem solving at an impressive level.' },
        { role: 'Internship Organization', text: "Klose integrated seamlessly into our team and delivered production quality code. His full stack knowledge and work ethic are exceptional for someone at his stage." },
        { role: 'Peer at YIBS', text: 'Working alongside Klose has been inspiring. His eye for design combined with strong backend knowledge makes him a truly full stack talent.' },
      ],
    },
  },
  fr: {
    common: {
      mainNavigation: 'Navigation principale',
      languageSelection: 'Choix de la langue',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      switchToLight: 'Passer au mode clair',
      switchToDark: 'Passer au mode sombre',
      lightMode: 'Mode clair',
      darkMode: 'Mode sombre',
      loading: 'Chargement',
      loadingPortfolio: 'Chargement du portfolio',
    },
    hero: {
      availability: 'Disponible pour travailler', greeting: 'Bonjour, je suis',
      paragraphs: [
        'Un développeur web passionné qui aime créer des expériences numériques belles et fonctionnelles avec innovation.',
        'Spécialisé dans les technologies web modernes et les solutions de conception centrées sur l’utilisateur.',
        'Je crée des applications réactives qui combinent créativité et technologies de pointe.',
        'Je transforme les idées en expériences numériques interactives grâce au code et au design.',
      ],
      stats: ['Projets présentés', 'Rôles clés', 'Technologies utilisées'],
      projects: 'Projets présentés', roles: 'Rôles clés', technologies: 'Technologies utilisées', download: 'Télécharger le CV', viewProjects: 'Voir les projets',
    },
    about: {
      heading: 'À', accent: 'propos', tag: 'Développeur full stack',
      intro: 'Je suis Akongseh Klose, un étudiant passionné en ingénierie logicielle qui aime transformer les idées en expériences web élégantes et fonctionnelles.',
      bio: 'Avec de solides bases en développement frontend et backend, je crée des produits numériques aussi beaux que performants et centrés sur l’utilisateur. J’apprends, je construis et je repousse constamment les limites du développement web.',
      name: 'Nom', location: 'Localisation', freelance: 'Freelance', available: 'Disponible', experience: "Années d'expérience", download: 'Télécharger le CV',
    },
    services: {
      heading: 'Mes', accent: 'Services', webTitle: 'Développement web', webDesc: 'Création d’applications web robustes et évolutives avec React, PHP, Laravel et MySQL, dans une architecture de code propre et maintenable.',
      maintenanceTitle: 'Maintenance de site web', maintenanceDesc: 'Maintien de votre présence web optimisée, sécurisée et à jour : corrections, performances et mises à jour régulières.',
      designTitle: 'Conception web', designDesc: 'Création d’interfaces remarquables centrées sur l’utilisateur, avec une attention à la typographie, aux couleurs, aux espacements et aux mises en page réactives.',
    },
    skills: {
      heading: 'Compétences',
      stackHeading: 'Stack',
      categories: { frontend: 'Frontend', backend: 'Backend & données', tools: 'Outils' },
    },
    particleShowcase: {
      heading: 'Des idées en mouvement',
      description: 'Un peu de code, un peu de créativité et beaucoup de possibilités.',
    },
    portfolio: {
      kicker: 'Travaux sélectionnés', heading: 'Projets', accent: 'présentés',
      intro: 'Quelques réalisations qui illustrent mon travail : des outils alimentés par l’IA aux expériences web soignées et aux produits full stack.',
      hover: 'Survolez pour voir les détails', tap: 'Touchez pour voir les détails', overview: 'Aperçu du projet', view: 'Voir le projet',
      projects: [
        { title: 'Présences par reconnaissance faciale', category: 'IA/ML', description: 'Système avancé de reconnaissance faciale pour le suivi automatisé des présences dans les établissements scolaires.' },
        { title: 'Chatbot IA', category: 'Application IA', description: 'Chatbot piloté par Python avec des workflows de traitement du langage naturel, des réponses intelligentes et l’automatisation de l’assistance.' },
        { title: 'IdeaMarket', category: 'Projet blockchain', description: 'Place de marché d’idées basée sur la blockchain, conçue avec Python et des workflows décentralisés pour favoriser la transparence et la collaboration.' },
        { title: 'Boutique en ligne', category: 'Conception web', description: 'Interface moderne de commerce en ligne avec panier, paiement et gestion des produits.' },
        { title: 'Tableau de bord administrateur', category: 'Tableau de bord', description: 'Tableau de bord développé avec Python et JavaScript pour l’analyse, les rapports et une gestion claire des rôles.' },
        { title: 'Plateforme de blog', category: 'CMS', description: 'Système de gestion de contenu avec éditeur enrichi, outils SEO et commentaires.' },
      ],
    },
    contact: {
      heading: 'Contactez', accent: 'moi', title: 'Travaillons ensemble', description: 'Vous avez un projet ou souhaitez discuter d’une opportunité ? Je serais ravi de vous entendre. Envoyez-moi un message et je vous répondrai dès que possible.',
      fullName: 'Nom complet', emailAddress: 'Adresse e-mail', phoneNumber: 'Numéro de téléphone', subject: 'Objet', message: 'Votre message', send: 'Envoyer le message', sent: 'Envoyé !', error: 'Veuillez remplir tous les champs avant l’envoi.', hint: 'Votre message s’ouvrira dans WhatsApp et sera envoyé au +237 671 313 884.', location: 'Localisation',
      email: 'E-mail', whatsapp: 'WhatsApp', messageIntro: 'Nouveau message depuis le portfolio de',
    },
    footer: {
      tagline: 'Je crée de belles expériences web fonctionnelles depuis Yaoundé, Cameroun. Disponible pour des missions freelance et des postes à temps plein.',
      quickLinks: 'Liens rapides', services: 'Services', getInTouch: 'Me contacter', rights: 'Tous droits réservés.',
      backToTop: 'Retour en haut',
      serviceList: ['Développement web', 'Maintenance de site web', 'Conception web', 'Conception UI/UX', 'Développement backend'],
    },
    faq: {
      heading: 'FAQ',
      items: [
        { q: 'Dans quelles technologies êtes-vous spécialisé ?', a: 'Je suis spécialisé en React, PHP, Laravel, MySQL, JavaScript, Python et les technologies web modernes. Je développe des applications full-stack avec un code propre et maintenable.' },
        { q: 'Êtes-vous disponible pour du freelance ?', a: 'Oui, je suis ouvert aux projets freelance et aux opportunités à temps plein. N\'hésitez pas à me contacter via le formulaire ou WhatsApp.' },
        { q: 'Combien de temps prend un projet typique ?', a: 'Les délais varient selon la portée et la complexité. Un site simple peut prendre 2-4 semaines, tandis qu\'une application full-stack peut prendre 2-3 mois ou plus.' },
        { q: 'Fournissez-vous une maintenance après le lancement ?', a: 'Absolument. Je propose des forfaits de maintenance continue incluant corrections de bugs, optimisation des performances, mises à jour de sécurité et nouvelles fonctionnalités.' },
        { q: 'Quel est votre processus de développement ?', a: 'Mon processus : Découverte & Planification → Design & Prototypage → Développement → Tests & QA → Lancement → Support post-lancement. Je vous tiens informé à chaque étape.' },
        { q: 'Pouvez-vous travailler avec mon équipe existante ?', a: 'Oui, je peux m\'intégrer facilement aux équipes existantes. Je suis les workflows Git standards, les pratiques de code review et les méthodologies agiles.' },
      ],
    },
    caseStudy: {
      eyebrow: 'Projet présenté', heading: 'Reconnaissance faciale', accent: 'Système de présence',
      problemLabel: 'Problème :',
      problem: 'Un système avancé de présence par reconnaissance faciale pour les employés. Il simplifie le suivi des présences, améliore la sécurité et réduit les erreurs manuelles en enregistrant automatiquement la présence grâce à l’identification faciale.',
      roles: [
        { title: 'Inscription des employés', description: 'Les employés s’inscrivent dans le système et leurs données biométriques faciales sont stockées en toute sécurité. Plusieurs angles du visage sont capturés pour une reconnaissance précise.' },
        { title: 'Suivi des présences', description: 'Enregistrement des présences en temps réel par reconnaissance faciale à l’arrivée au bureau. Des notifications instantanées sont envoyées aux responsables et administrateurs.' },
        { title: 'Analyses et rapports', description: 'Rapports détaillés avec des analyses basées sur l’IA, l’étude des données historiques et des alertes prédictives pour les employés susceptibles d’être à risque.' },
      ],
      builtWith: 'Développé avec :', liveDemo: 'Démo en direct', viewCode: 'Voir le code',
    },
    whatsapp: { label: 'WhatsApp', aria: 'Accéder au formulaire de contact', title: 'Contacter via WhatsApp' },
    testimonials: {
      heading: 'Ce que les gens', accent: 'disent',
      entries: [
        { role: 'Superviseur de terrain, YIBS', text: 'La capacité de Klose à transformer des besoins complexes en solutions web élégantes et fonctionnelles est remarquable. IdeaMarket témoigne de ses compétences techniques et de sa vision créative.' },
        { role: 'Superviseur académique, YIBS', text: 'Un étudiant remarquable dont le dévouement à l’ingénierie logicielle dépasse le cadre de la salle de classe. Son projet démontre une excellente capacité à résoudre des problèmes concrets.' },
        { role: 'Organisation de stage', text: 'Klose s’est parfaitement intégré à notre équipe et a livré du code de qualité professionnelle. Ses compétences full stack et son sérieux sont exceptionnels pour son niveau.' },
        { role: 'Collègue développeur à YIBS', text: 'Travailler avec Klose est une source d’inspiration. Son sens du design et ses solides compétences backend en font un véritable talent full stack.' },
      ],
    },
  },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = (path) => path.split('.').reduce((value, key) => value?.[key], translations[language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, labels: navigationLabels[language], t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
