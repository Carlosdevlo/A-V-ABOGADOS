const WhatsappService = require('../services/whatsappService');

const homeController = {
  _buildHomeData() {
    return {
      services: [
        { id: 'accidentes-transito', icon: 'car', title: 'Accidentes de tránsito', description: 'Defendemos sus derechos y le acompañamos para reclamar una indemnización justa ante accidentes de tránsito.', image: '/images/services-img/accidentes-transito.jpg' },
        { id: 'indemnizaciones', icon: 'file-text', title: 'Indemnizaciones', description: 'Exigimos el reconocimiento de perjuicios morales, lucro cesante y gastos médicos ante las aseguradoras.', image: '/images/services-img/indemnizaciones.jpg' },
        { id: 'lesiones-personales', icon: 'heart-pulse', title: 'Lesiones personales', description: 'Representación integral para lesiones físicas y psicológicas causadas por negligencia.', image: '/images/services-img/lesiones-personales.jpg' },
        { id: 'homicidio-culposo', icon: 'gavel', title: 'Homicidio culposo', description: 'Asistencia jurídica para familias afectadas por homicidios culposos y defensa ante la Fiscalía.', image: '/images/services-img/homicidio-culposo.jpg' },
        { id: 'acompanamiento-integral', icon: 'hand-heart', title: 'Acompañamiento integral', description: 'Lo acompañamos en cada etapa del proceso, desde la gestión de su caso hasta la obtención del resultado.', image: '/images/services-img/acompanamiento.jpg' },
        { id: 'asesoria-juridica', icon: 'shield', title: 'Asesoría jurídica', description: 'Orientación legal especializada sin costo para evaluar su caso y determinar la mejor estrategia.', image: '/images/services-img/asesoria-juridica.jpg' }
      ],
      accidentSteps: [
        { number: '01', title: 'Detenga el vehículo con seguridad', description: 'Detenga su vehículo en un lugar seguro, active las luces de emergencia y evite obstruir la vía.' },
        { number: '02', title: 'Llame a la policía y a los bomberos', description: 'Reporte el accidente a la policía y, si hay heridos, solicite atención médica inmediata.' },
        { number: '03', title: 'Documente todo con fotos', description: 'Tome fotos de los daños, las matrículas, las señales de tránsito y el lugar del accidente.' },
        { number: '04', title: 'No firme declaraciones de culpabilidad', description: 'No firme documentos que reconozcan culpa; consulte con un abogado antes de firmar cualquier cosa.' },
        { number: '05', title: 'Informe el accidente a su aseguradora', description: 'Comuníquese con su aseguradora dentro de los plazos legales, pero sin aceptar responsabilidad.' },
        { number: '06', title: 'Consulte a un abogado especializado', description: 'Un abogado especializado en seguros y responsabilidad civil protegerá sus derechos desde el primer momento.' }
      ],
      steps: [
        { number: '01', title: 'Cuéntenos su caso', description: 'Comuníquese con nosotros y cuéntenos los detalles de su situación.' },
        { number: '02', title: 'Analizamos la situación', description: 'Evaluamos los hechos y determinamos la mejor estrategia de acción.' },
        { number: '03', title: 'Preparamos la reclamación', description: 'Preparamos y presentamos la documentación ante la aseguradora.' },
        { number: '04', title: 'Negociamos una indemnización justa', description: 'Exigimos una compensación acorde a la normativa colombiana.' },
        { number: '05', title: 'Lo acompañamos hasta el resultado', description: 'Trabajamos hasta obtener una indemnización justa y completa.' }
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
        { question: '¿Me pueden representar ante una aseguradora?', answer: 'Sí. Exigimos una justa indemnización frente a la compañía de seguros por perjuicios morales, daños materiales y lucro cesante.' },
        { question: '¿También me acompañan ante Fiscalía?', answer: 'Sí. Asistimos sin costo alguno frente al proceso penal en la Fiscalía.' },
        { question: '¿Pueden evaluar pérdida de capacidad laboral?', answer: 'Sí. Evaluamos su posible pérdida de capacidad laboral (PCL) y gestionamos el reconocimiento correspondiente.' },
        { question: '¿Atienden víctimas fuera de Bogotá?', answer: 'Sí. Hemos representado a víctimas de accidentes de tránsito a nivel nacional.' }
      ],
      fees: {
        title: 'Honorarios claros desde el primer día',
        subtitle: 'Sin sorpresas ni cargos ocultos. Suáble nos explicamos.',
        items: [
          { title: 'Asesoría inicial sin costo', description: 'Evaluación de su caso y diagnóstico legal sin cargo alguno.' },
          { title: 'Honorarios sobre resultados', description: 'Solo generamos honorarios si logramos una indemnización favorable.' },
          { title: 'Sin costos adelantados', description: 'No paga gastos del proceso hasta que su caso tenga éxito.' }
        ],
        percentage: '30%',
        percentageNote: 'Sobre el monto total de la indemnización obtenida.'
      },
      aboutContent: {
        badge: 'Quiénes somos',
        title: 'Abogados especializados en accidentes de tránsito y seguros',
        subtitle: 'Más de 7 años de experiencia defendiendo los derechos de víctimas de accidentes de tránsito y familias afectadas por homicidios culposos en Colombia.',
        description: 'En A&V Abogados nos dedicamos exclusivamente a representar a víctimas de accidentes de tránsito, familiares de víctimas fatales y personas que enfrentan problemas con sus aseguradoras. Nuestro enfoque combina conocimiento profundo del derecho de seguros, responsabilidad civil y penal, con un trato humano y cercano que entiende las dificultades que vive su situación.',
        image: '/images/sections/hero-professional.jpg',
        values: [
          { icon: 'gavel', title: 'Especialización', description: 'Prácticamente exclusiva en derecho de seguros y responsabilidad civil.' },
          { icon: 'heart', title: 'Compromiso', description: 'Defendemos sus derechos como si fueran los nuestros.' },
          { icon: 'users', title: 'Equipo multidisciplinario', description: 'Contamos con abogados, auditores y aliados médicos.' }
        ]
      },
      companies: [
        { name: 'Seguros Bolívar' },
        { name: 'Allianz' },
        { name: 'AXA Colpatria' },
        { name: 'Suramericana' },
        { name: 'HDI Seguros' },
        { name: 'SBS' },
        { name: 'MAPFRE' },
        { name: 'Mundial' },
        { name: 'La Equidad' },
        { name: 'Zurich' }
      ],
      acompanaBenefits: [
        {
          number: '01',
          icon: 'car',
          title: 'Servicio de transporte gratuito',
          description: 'Sabemos que después de un accidente la movilidad puede ser difícil. Por eso, le enviamos transporte sin costo para que pueda acercarse a nuestras oficinas, revisar su caso y recibir orientación profesional sin preocuparse por desplazamientos.'
        },
        {
          number: '02',
          icon: 'heart-pulse',
          title: 'Valoración médica y fisioterapia sin costo',
          description: 'Su salud es lo más importante.',
          benefits: [
            'Valoración médica inicial para revisar su estado físico.',
            'Sesión de fisioterapia con profesionales certificados para apoyar su recuperación y aliviar molestias derivadas del accidente.'
          ]
        },
        {
          number: '03',
          icon: 'dove',
          title: 'Terapias psicológicas de duelo',
          description: 'Cuando el accidente involucra la pérdida de un ser querido, acompañamos a su familia con:',
          special_note: 'Casos de homicidio',
          note_icon: 'shield-alert',
          benefits: [
            'Terapias psicológicas de duelo.',
            'Acompañamiento emocional especializado.',
            'Sesiones familiares para manejo de crisis.'
          ]
        },
        {
          number: '04',
          icon: 'file-text',
          title: 'Gestión del SOAT sin costo',
          description: 'Nos encargamos de reclamar el SOAT por usted.',
          benefits: [
            'Incapacidades',
            'Gastos médicos',
            'Transporte',
            'Gastos funerarios, si aplica'
          ]
        },
        {
          number: '05',
          icon: 'car-crash',
          title: 'Reclamación de daños materiales del vehículo',
          description: 'Le ayudamos a gestionar la indemnización por los daños de su vehículo.',
          benefits: [
            'Acompañamiento técnico',
            'Negociación con aseguradoras',
            'Revisión de talleres y presupuestos',
            'Defensa de sus derechos como víctima'
          ]
        },
        {
          number: '06',
          icon: 'wallet',
          title: 'Apoyo económico mensual',
          description: 'Si está pasando por dificultades económicas, le apoyamos con una ayuda mensual mientras avanzamos en su proceso de indemnización.'
        },
        {
          number: '07',
          icon: 'trending-up',
          title: 'Asesoría para administrar su indemnización',
          description: 'Cuando reciba su indemnización, le ayudamos a tomar decisiones informadas sobre su gestión.',
          benefits: [
            'Asesoría financiera gratuita',
            'Opciones de inversión seguras',
            'Proyección de rendimiento',
            'Acompañamiento para proteger su dinero'
          ]
        }
      ]
    };
  },

  renderHome(req, res) {
    const whatsappLink = WhatsappService.buildLink();

    res.render('pages/home', {
      title: 'A&V Abogados | Accidentes de Tránsito, Seguros e Indemnizaciones',
      description: 'Abogados especializados en accidentes de tránsito, seguros y responsabilidad civil en Colombia. Defendemos sus derechos y buscamos una indemnización justa. Asesoría sin costo.',
      page: 'home',
      whatsappLink,
      ...homeController._buildHomeData()
    });
  }
};

module.exports = homeController;