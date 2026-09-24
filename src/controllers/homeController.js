const WhatsappService = require('../services/whatsappService');

const homeController = {
  _buildHomeData() {
    return {
      stats: {
        experience: 7,
        victims: 256,
        compensation: 6567,
        coverage: 'Nacional'
      },
      services: [
        { id: 'accidentes-transito', icon: 'car', title: 'Accidentes de tránsito', description: 'Defendemos sus derechos y le acompañamos para reclamar una indemnización justa ante accidentes de tránsito.', image: '/images/services-img/accidentes-transito.jpg', featured: true },
        { id: 'indemnizaciones', icon: 'file-text', title: 'Indemnizaciones', description: 'Exigimos el reconocimiento de daños morales, lucro cesante y gastos médicos ante las aseguradoras.', image: '/images/services-img/indemnizaciones.jpg', featured: false },
        { id: 'lesiones-personales', icon: 'heart-pulse', title: 'Lesiones personales', description: 'Representación integral para lesiones físicas y psicológicas causadas por negligencia.', image: '/images/services-img/lesiones-personales.jpg', featured: false },
        { id: 'homicidio-culposo', icon: 'gavel', title: 'Homicidio culposo', description: 'Asistencia jurídica para familias afectadas por homicidios culposos y defensa ante la Fiscalía.', image: '/images/services-img/homicidio-culposo.jpg', featured: false },
        { id: 'acompanamiento-integral', icon: 'hand-heart', title: 'Acompañamiento integral', description: 'Lo acompañamos en cada etapa del proceso, desde la gestión de su caso hasta la obtención del resultado.', image: '/images/services-img/acompanamiento.jpg', featured: false },
        { id: 'asesoria-juridica', icon: 'shield', title: 'Asesoría jurídica', description: 'Orientación legal especializada sin costo para evaluar su caso y determinar la mejor estrategia.', image: '/images/services-img/asesoria-juridica.jpg', featured: false }
      ],
      legalServices: [
        { id: 1, title: 'Reclamación ante compañías de seguros', description: 'Exigimos una justa indemnización por daños y perjuicios ante las compañías aseguradoras.' },
        { id: 2, title: 'Representación jurídica en Fiscalía', description: 'Asistimos en representación jurídica del delito penal que curse ante la Fiscalía.' },
        { id: 3, title: 'Evaluación de pérdida de capacidad laboral (PCL)', description: 'Evaluamos su posible pérdida de capacidad laboral y gestionamos el reconocimiento correspondiente.' },
        { id: 4, title: 'Orientación integral', description: 'Lo acompañamos con orientación integral durante toda su reclamación.' }
      ],
      steps: [
        { number: '01', title: 'Cuéntenos su caso', description: 'Comuníquese con nosotros y cuéntenos los detalles de su situación.' },
        { number: '02', title: 'Analizamos la situación', description: 'Evaluamos los hechos y determinamos la mejor estrategia de acción.' },
        { number: '03', title: 'Iniciamos la reclamación', description: 'Presentamos la reclamación ante la aseguradora y la Fiscalía.' },
        { number: '04', title: 'Lo acompañamos durante el proceso', description: 'Trabajamos hasta obtener una indemnización justa y completa.' }
      ],
      clientTypes: [
        { id: 'lesiones', icon: 'crutch', title: 'Sufrió lesiones en un accidente', description: 'Lesiones físicas o psicológicas causadas por negligencia en un accidente de tránsito. Le acompañamos en la gestión de gastos médicos y daños.' },
        { id: 'familiar', icon: 'users', title: 'Un familiar fue víctima de un accidente', description: 'Homicidio culposo o lesiones graves de un ser querido. Representación integral para familias en duelo y trámites de seguros.' },
        { id: 'aseguradora', icon: 'shield', title: 'Tiene problemas con una aseguradora', description: 'Su reclamación fue rechazada o subestimada. Exigimos el reconocimiento justo de sus derechos frente a cualquier compañía.' },
        { id: 'materiales', icon: 'home', title: 'Tiene daños materiales', description: 'Daños a su vehículo, propiedad o bienes personales. Gestionamos la indemnización por daños materiales y lucro cesante.' },
        { id: 'fiscalia', icon: 'gavel', title: 'Está en proceso ante Fiscalía', description: 'Representación jurídica integral ante la Fiscalía por accidentes de tránsito, homicidios culposos y responsabilidad penal.' },
        { id: 'pcl', icon: 'activity', title: 'Necesita evaluar pérdida de capacidad laboral', description: 'Pérdida parcial o total de capacidad laboral. Evaluamos su caso y gestionamos el reconocimiento correspondiente con apoyo médico.' }
      ],
      faqs: [
        { question: '¿La asesoría tiene costo?', answer: 'No. La asesoría inicial es completamente sin costo. No paga nada hasta que se logre una indemnización.' },
        { question: '¿Cuándo cobran honorarios?', answer: 'Solo generamos honorarios si ganamos el caso. Trabajamos sobre resultados.' },
        { question: '¿Qué porcentaje cobran?', answer: 'Cobramos un 30% sobre el monto total de la indemnización que se logre.' },
        { question: '¿Me pueden representar ante una aseguradora?', answer: 'Sí. Exigimos una justa indemnización frente a la compañía de seguros por daños y perjuicios.' },
        { question: '¿También me acompañan ante Fiscalía?', answer: 'Sí. Asistimos sin costo alguno frente al proceso penal en la Fiscalía.' },
        { question: '¿Pueden evaluar pérdida de capacidad laboral?', answer: 'Sí. Evaluamos su posible pérdida de capacidad laboral (PCL) y gestionamos el reconocimiento correspondiente.' },
        { question: '¿Atienden víctimas fuera de Bogotá?', answer: 'Sí. Hemos representado a más de 256 víctimas de accidentes de tránsito a nivel nacional.' }
      ],
      valorBenefits: [
        {
          number: '01',
          icon: 'car',
          title: 'Servicio de transporte gratuito',
          description: 'Sabemos que después de un accidente la movilidad puede ser difícil. Por eso, te enviamos transporte sin costo para que puedas acercarte a nuestras oficinas, revisar tu caso y recibir orientación profesional sin preocuparte por desplazamientos.'
        },
        {
          number: '02',
          icon: 'heart-pulse',
          title: 'Valoración médica y fisioterapia sin costo',
          description: 'Tu salud es lo más importante.',
          benefits: [
            'Valoración médica inicial para revisar tu estado físico.',
            'Sesión de fisioterapia con profesionales certificados para apoyar tu recuperación y aliviar molestias derivadas del accidente.'
          ]
        },
        {
          number: '03',
          icon: 'dove',
          title: 'Terapias psicológicas de duelo',
          description: 'Cuando el accidente involucra la pérdida de un ser querido, acompañamos a tu familia con:',
          note_icon: 'shield-alert',
          special_note: 'Casos de homicidio',
          benefits: [
            'Terapias psicológicas de duelo.',
            'Acompañamiento emocional especializado.',
            'Sesiones familiares para manejo de crisis.'
          ],
          highlight: 'Tu bienestar emocional también es parte de la reparación integral.'
        },
        {
          number: '04',
          icon: 'file-text',
          title: 'Gestión del SOAT sin costo',
          description: 'Nos encargamos de reclamar el SOAT por ti.',
          benefits: [
            'Incapacidades',
            'Gastos médicos',
            'Transporte',
            'Gastos funerarios, si aplica'
          ],
          highlight: 'Todo sin ningún costo adicional.'
        },
        {
          number: '05',
          icon: 'car-crash',
          title: 'Reclamación de daños materiales del vehículo',
          description: 'Te ayudamos a gestionar la indemnización por los daños de tu vehículo.',
          benefits: [
            'Acompañamiento técnico',
            'Negociación con aseguradoras',
            'Revisión de talleres y presupuestos',
            'Defensa de tus derechos como víctima'
          ]
        },
        {
          number: '06',
          icon: 'wallet',
          title: 'Apoyo económico mensual',
          description: 'Si estás pasando por dificultades económicas, te apoyamos con una ayuda mensual mientras avanzamos en tu proceso de indemnización.',
          highlight: '$300.000',
          highlight_note: 'Este apoyo será descontado del valor final que recibas, sin intereses ni costos ocultos.'
        },
        {
          number: '07',
          icon: 'trending-up',
          title: 'Asesoría gratuita para invertir tu indemnización',
          description: 'Cuando recibas tu indemnización, te ayudamos a tomar decisiones inteligentes.',
          benefits: [
            'Asesoría financiera gratuita',
            'Opciones de inversión seguras',
            'Proyección de rendimiento',
            'Acompañamiento para proteger tu dinero'
          ],
          highlight: 'Queremos que tu indemnización se convierta en una oportunidad de crecimiento.'
        }
      ]
    };
  },

  renderHome(req, res) {
    const whatsappLink = WhatsappService.buildLink();

    res.render('pages/home', {
      title: 'A&V Abogados | Accidentes de Tránsito, Seguros e Indemnizaciones',
      description: 'Abogados especializados en accidentes de tránsito, seguros y responsabilidad civil en Colombia. Defendemos sus derechos y buscamos una indemnización justa.',
      page: 'home',
      whatsappLink,
      ...homeController._buildHomeData()
    });
  }
};

module.exports = homeController;
