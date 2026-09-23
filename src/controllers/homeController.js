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
        { id: 'da-Emergente', icon: 'shield', title: 'Daño Emergente', description: 'Cobertura de gastos médicos y gastos necesarios derivados de un accidente.' },
        { id: 'perjuicio-moral', icon: 'heart', title: 'Perjuicio Moral', description: 'Indemnización por el daño emocional y psicológico causado por el accidente.' },
        { id: 'lucro-cesante', icon: 'bank', title: 'Lucro Cesante', description: 'Compensación por los ingresos que dejó de generar debido a la inmovilización.' },
        { id: 'danos-salud', icon: 'health', title: 'Daño a la salud', description: 'Cobertura de tratamientos médicos, fisioterapia y rehabilitación requerida.' },
        { id: 'danos-materiales', icon: 'home', title: 'Daños materiales', description: 'Reparación o reemplazo de bienes dañados en el siniestro.' }
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
        { id: 'lesiones', icon: 'crutch', title: 'Sufrió lesiones en un accidente' },
        { id: 'familiar', icon: 'users', title: 'Un familiar fue víctima de un accidente' },
        { id: 'aseguradora', icon: 'shield', title: 'Tiene problemas con una aseguradora' },
        { id: 'materiales', icon: 'home', title: 'Tiene daños materiales' },
        { id: 'fiscalia', icon: 'gavel', title: 'Está en proceso ante Fiscalía' },
        { id: 'pcl', icon: 'activity', title: 'Necesita evaluar pérdida de capacidad laboral' }
      ],
      faqs: [
        { question: '¿La asesoría tiene costo?', answer: 'No. La asesoría inicial es completamente sin costo. No paga nada hasta que se logre una indemnización.' },
        { question: '¿Cuándo cobran honorarios?', answer: 'Solo generamos honorarios si ganamos el caso. Trabajamos sobre resultados.' },
        { question: '¿Qué porcentaje cobran?', answer: 'Cobramos un 30% sobre el monto total de la indemnización que se logre.' },
        { question: '¿Me pueden representar ante una aseguradora?', answer: 'Sí. Exigimos una justa indemnización frente a la compañía de seguros por daños y perjuicios.' },
        { question: '¿También me acompañan ante Fiscalía?', answer: 'Sí. Asistimos sin costo alguno frente al proceso penal en la Fiscalía.' },
        { question: '¿Pueden evaluar pérdida de capacidad laboral?', answer: 'Sí. Evaluamos su posible pérdida de capacidad laboral (PCL) y gestionamos el reconocimiento correspondiente.' },
        { question: '¿Atienden víctimas fuera de Bogotá?', answer: 'Sí. Hemos representado a más de 256 víctimas de accidentes de tránsito a nivel nacional.' }
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
