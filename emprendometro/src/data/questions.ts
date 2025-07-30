// src/data/questions.ts
// --------------------------------------------
// Tipos
export interface Option {
  label: "A" | "B" | "C" | "D";
  text: string;
  value: 1 | 2 | 3 | 4;
}

export interface Question {
  id: string;
  dimension:
    | "curiosidad"
    | "resiliencia"
    | "comercial"
    | "estrategia"
    | "liderazgo"
    | "autonomia"
    | "proposito"
    | "emocional";
  text: string;
  options: Option[];
}

// --------------------------------------------
// Preguntas (8 dimensiones × 5 preguntas = 40)
export const questions: Question[] = [
  /* ---------- Curiosidad e iniciativa ---------- */
  {
    id: "cur_1",
    dimension: "curiosidad",
    text: "Cuando no entiendo algo…",
    options: [
      { label: "A", text: "Lo dejo pasar o espero que alguien lo explique.", value: 1 },
      { label: "B", text: "Anoto la duda para verla después, pero rara vez lo hago.", value: 2 },
      { label: "C", text: "Busco una respuesta rápida en internet.", value: 3 },
      { label: "D", text: "Investigo en profundidad hasta entenderlo bien.", value: 4 }
    ]
  },
  {
    id: "cur_2",
    dimension: "curiosidad",
    text: "Cuando tengo una idea nueva…",
    options: [
      { label: "A", text: "La olvido si no me la piden o no la necesito.", value: 1 },
      { label: "B", text: "La escribo, pero rara vez la desarrollo.", value: 2 },
      { label: "C", text: "Hago una prueba básica o la comparto con alguien.", value: 3 },
      { label: "D", text: "Me entusiasmo y empiezo a trabajarla de inmediato.", value: 4 }
    ]
  },
  {
    id: "cur_3",
    dimension: "curiosidad",
    text: "Ante un tema que no conozco…",
    options: [
      { label: "A", text: "Prefiero no meterme.", value: 1 },
      { label: "B", text: "Escucho si alguien lo explica bien.", value: 2 },
      { label: "C", text: "Leo o veo algún video corto.", value: 3 },
      { label: "D", text: "Me encanta aprender cosas nuevas, aunque no las entienda aún.", value: 4 }
    ]
  },
  {
    id: "cur_4",
    dimension: "curiosidad",
    text: "En general, me considero…",
    options: [
      { label: "A", text: "Poco curioso/a.", value: 1 },
      { label: "B", text: "Curioso/a si el tema me toca de cerca.", value: 2 },
      { label: "C", text: "Bastante curioso/a con lo que me rodea.", value: 3 },
      { label: "D", text: "Muy curioso/a. Me encanta descubrir y explorar.", value: 4 }
    ]
  },
  {
    id: "cur_5",
    dimension: "curiosidad",
    text: "Cuando alguien menciona algo que desconozco…",
    options: [
      { label: "A", text: "Cambio de tema.", value: 1 },
      { label: "B", text: "Escucho sin involucrarme.", value: 2 },
      { label: "C", text: "Pregunto más.", value: 3 },
      { label: "D", text: "Quiero saber todo: busco, leo y lo anoto.", value: 4 }
    ]
  },

  /* ---------- Resiliencia ---------- */
  {
    id: "res_1",
    dimension: "resiliencia",
    text: "Cuando me equivoco en algo importante…",
    options: [
      { label: "A", text: "Me frustro y tiendo a abandonar.", value: 1 },
      { label: "B", text: "Me siento mal un buen rato.", value: 2 },
      { label: "C", text: "Lo acepto, aunque me duela.", value: 3 },
      { label: "D", text: "Aprendo y ajusto sin perder energía.", value: 4 }
    ]
  },
  {
    id: "res_2",
    dimension: "resiliencia",
    text: "Si un proyecto fracasa…",
    options: [
      { label: "A", text: "Lo tomo como una derrota personal.", value: 1 },
      { label: "B", text: "Tardo en recuperarme.", value: 2 },
      { label: "C", text: "Reflexiono y vuelvo a intentar con otra estrategia.", value: 3 },
      { label: "D", text: "Lo veo como parte del camino emprendedor.", value: 4 }
    ]
  },
  {
    id: "res_3",
    dimension: "resiliencia",
    text: "Cuando recibo críticas…",
    options: [
      { label: "A", text: "Me afecta mucho.", value: 1 },
      { label: "B", text: "Las escucho pero me cuesta procesarlas.", value: 2 },
      { label: "C", text: "Evalúo si tienen razón y trato de aprender.", value: 3 },
      { label: "D", text: "Las busco activamente para mejorar.", value: 4 }
    ]
  },
  {
    id: "res_4",
    dimension: "resiliencia",
    text: "En momentos de presión…",
    options: [
      { label: "A", text: "Me bloqueo o me paralizo.", value: 1 },
      { label: "B", text: "Me cuesta, pero sigo.", value: 2 },
      { label: "C", text: "Me enfoco en lo esencial.", value: 3 },
      { label: "D", text: "Actúo con claridad y calma.", value: 4 }
    ]
  },
  {
    id: "res_5",
    dimension: "resiliencia",
    text: "¿Cómo me veo frente a la adversidad?",
    options: [
      { label: "A", text: "Inseguro/a y con miedo.", value: 1 },
      { label: "B", text: "Vulnerable, pero intento avanzar.", value: 2 },
      { label: "C", text: "Flexible y preparado/a para cambiar.", value: 3 },
      { label: "D", text: "Fuerte, optimista y resistente.", value: 4 }
    ]
  },

  /* ---------- Comercial (comunicativa) ---------- */
  {
    id: "com_1",
    dimension: "comercial",
    text: "Contar mis ideas en público…",
    options: [
      { label: "A", text: "Me paraliza.", value: 1 },
      { label: "B", text: "Lo hago si me obligan.", value: 2 },
      { label: "C", text: "Me animo con preparación.", value: 3 },
      { label: "D", text: "Me encanta. Es mi zona de confort.", value: 4 }
    ]
  },
  {
    id: "com_2",
    dimension: "comercial",
    text: "Vender un producto propio…",
    options: [
      { label: "A", text: "Me da vergüenza o me incomoda.", value: 1 },
      { label: "B", text: "Puedo hacerlo, pero no me gusta.", value: 2 },
      { label: "C", text: "Me esfuerzo aunque no sea experto/a.", value: 3 },
      { label: "D", text: "Disfruto vender. Lo hago con entusiasmo.", value: 4 }
    ]
  },
  {
    id: "com_3",
    dimension: "comercial",
    text: "En una conversación con desconocidos…",
    options: [
      { label: "A", text: "No hablo si no es necesario.", value: 1 },
      { label: "B", text: "Escucho más que participo.", value: 2 },
      { label: "C", text: "Suelo involucrarme activamente.", value: 3 },
      { label: "D", text: "Tomo la iniciativa y conecto fácilmente.", value: 4 }
    ]
  },
  {
    id: "com_4",
    dimension: "comercial",
    text: "Explicar el valor de mi proyecto…",
    options: [
      { label: "A", text: "Me cuesta resumirlo o comunicarlo.", value: 1 },
      { label: "B", text: "Doy muchas vueltas.", value: 2 },
      { label: "C", text: "Lo explico bien si tengo tiempo.", value: 3 },
      { label: "D", text: "Sé comunicarlo con claridad y emoción.", value: 4 }
    ]
  },
  {
    id: "com_5",
    dimension: "comercial",
    text: "En situaciones sociales…",
    options: [
      { label: "A", text: "Me retraigo.", value: 1 },
      { label: "B", text: "Participo si me incluyen.", value: 2 },
      { label: "C", text: "Me adapto bien.", value: 3 },
      { label: "D", text: "Suelo liderar o animar el grupo.", value: 4 }
    ]
  },

  /* ---------- Pensamiento estratégico ---------- */
  {
    id: "est_1",
    dimension: "estrategia",
    text: "Tomar decisiones complejas…",
    options: [
      { label: "A", text: "Me abruma.", value: 1 },
      { label: "B", text: "Elijo por intuición.", value: 2 },
      { label: "C", text: "Analizo los pros y contras.", value: 3 },
      { label: "D", text: "Hago escenarios, consulto y decido.", value: 4 }
    ]
  },
  {
    id: "est_2",
    dimension: "estrategia",
    text: "Planificar un proyecto…",
    options: [
      { label: "A", text: "Me resulta confuso.", value: 1 },
      { label: "B", text: "Hago una lista mental.", value: 2 },
      { label: "C", text: "Organizo tareas y prioridades.", value: 3 },
      { label: "D", text: "Uso herramientas, hitos y métricas.", value: 4 }
    ]
  },
  {
    id: "est_3",
    dimension: "estrategia",
    text: "Frente a cambios inesperados…",
    options: [
      { label: "A", text: "Me desoriento.", value: 1 },
      { label: "B", text: "Me cuesta reorganizarme.", value: 2 },
      { label: "C", text: "Me adapto con cierto orden.", value: 3 },
      { label: "D", text: "Vuelvo a planear con rapidez y visión.", value: 4 }
    ]
  },
  {
    id: "est_4",
    dimension: "estrategia",
    text: "Visualizar el futuro…",
    options: [
      { label: "A", text: "No pienso mucho en eso.", value: 1 },
      { label: "B", text: "Tengo ideas vagas.", value: 2 },
      { label: "C", text: "Tengo metas a mediano plazo.", value: 3 },
      { label: "D", text: "Tengo una visión clara de largo plazo.", value: 4 }
    ]
  },
  {
    id: "est_5",
    dimension: "estrategia",
    text: "Organizar mis objetivos…",
    options: [
      { label: "A", text: "No tengo objetivos definidos.", value: 1 },
      { label: "B", text: "Me cuesta priorizar.", value: 2 },
      { label: "C", text: "Establezco metas mensuales o anuales.", value: 3 },
      { label: "D", text: "Trabajo con objetivos concretos y medibles.", value: 4 }
    ]
  },

  /* ---------- Liderazgo y equipo ---------- */
  {
    id: "lid_1",
    dimension: "liderazgo",
    text: "En un grupo de trabajo…",
    options: [
      { label: "A", text: "Prefiero que me digan qué hacer.", value: 1 },
      { label: "B", text: "Hago mi parte y poco más.", value: 2 },
      { label: "C", text: "Me involucro en coordinar tareas.", value: 3 },
      { label: "D", text: "Inspiro y organizo al equipo naturalmente.", value: 4 }
    ]
  },
  {
    id: "lid_2",
    dimension: "liderazgo",
    text: "Cuando hay un conflicto…",
    options: [
      { label: "A", text: "Me alejo o me callo.", value: 1 },
      { label: "B", text: "Trato de evitarlo.", value: 2 },
      { label: "C", text: "Intento mediar si me afecta.", value: 3 },
      { label: "D", text: "Enfrento el problema y busco solución colectiva.", value: 4 }
    ]
  },
  {
    id: "lid_3",
    dimension: "liderazgo",
    text: "Escuchar a otros…",
    options: [
      { label: "A", text: "Me impaciento si no piensan como yo.", value: 1 },
      { label: "B", text: "Escucho pero no cambio de opinión fácil.", value: 2 },
      { label: "C", text: "Escucho y evalúo alternativas.", value: 3 },
      { label: "D", text: "Escucho con apertura y empatía.", value: 4 }
    ]
  },
  {
    id: "lid_4",
    dimension: "liderazgo",
    text: "Delegar tareas…",
    options: [
      { label: "A", text: "Me cuesta confiar.", value: 1 },
      { label: "B", text: "Solo delego si estoy desbordado.", value: 2 },
      { label: "C", text: "Delego con seguimiento cercano.", value: 3 },
      { label: "D", text: "Delego con claridad, confianza y autonomía.", value: 4 }
    ]
  },
  {
    id: "lid_5",
    dimension: "liderazgo",
    text: "En equipos diversos…",
    options: [
      { label: "A", text: "Me incomoda si hay diferencias fuertes.", value: 1 },
      { label: "B", text: "Me adapto, aunque prefiero equipos homogéneos.", value: 2 },
      { label: "C", text: "Aporto desde mi lugar, valoro otras miradas.", value: 3 },
      { label: "D", text: "Me enriquecen las diferencias y saco lo mejor de cada uno.", value: 4 }
    ]
  },

  /* ---------- Autonomía y foco ---------- */
  {
    id: "aut_1",
    dimension: "autonomia",
    text: "Si nadie me exige…",
    options: [
      { label: "A", text: "Me cuesta avanzar.", value: 1 },
      { label: "B", text: "Hago lo justo, sin presión.", value: 2 },
      { label: "C", text: "Me organizo si tengo objetivos claros.", value: 3 },
      { label: "D", text: "Sigo mi plan con disciplina, sin necesidad externa.", value: 4 }
    ]
  },
  {
    id: "aut_2",
    dimension: "autonomia",
    text: "Organizar mi tiempo…",
    options: [
      { label: "A", text: "Me resulta caótico.", value: 1 },
      { label: "B", text: "Uso agenda o recordatorios, pero no siempre funciona.", value: 2 },
      { label: "C", text: "Planifico tareas semanales.", value: 3 },
      { label: "D", text: "Tengo rutinas sólidas y foco en mis prioridades.", value: 4 }
    ]
  },
  {
    id: "aut_3",
    dimension: "autonomia",
    text: "Mantenerme enfocado…",
    options: [
      { label: "A", text: "Me disperso con facilidad.", value: 1 },
      { label: "B", text: "Necesito entornos controlados para concentrarme.", value: 2 },
      { label: "C", text: "Me enfoco si hay plazos o presión.", value: 3 },
      { label: "D", text: "Mantengo la concentración de forma natural.", value: 4 }
    ]
  },
  {
    id: "aut_4",
    dimension: "autonomia",
    text: "Avanzar sin guía externa…",
    options: [
      { label: "A", text: "Me paralizo si no hay dirección clara.", value: 1 },
      { label: "B", text: "Pido ayuda o busco plantillas.", value: 2 },
      { label: "C", text: "Me autogestiono con cierta autonomía.", value: 3 },
      { label: "D", text: "Soy proactivo/a y tomo decisiones por mi cuenta.", value: 4 }
    ]
  },
  {
    id: "aut_5",
    dimension: "autonomia",
    text: "Enfrentar tareas largas o complejas…",
    options: [
      { label: "A", text: "Me abruman y las pospongo.", value: 1 },
      { label: "B", text: "Las divido, pero a veces las dejo a mitad.", value: 2 },
      { label: "C", text: "Las abordo por partes, manteniendo constancia.", value: 3 },
      { label: "D", text: "Me organizo bien, incluso si llevan tiempo.", value: 4 }
    ]
  },

  /* ---------- Propósito ---------- */
  {
    id: "pro_1",
    dimension: "proposito",
    text: "Saber por qué hago lo que hago…",
    options: [
      { label: "A", text: "No lo tengo claro.", value: 1 },
      { label: "B", text: "Me lo pregunto a veces, sin respuesta firme.", value: 2 },
      { label: "C", text: "Tengo una idea general.", value: 3 },
      { label: "D", text: "Tengo un propósito claro y me guía.", value: 4 }
    ]
  },
  {
    id: "pro_2",
    dimension: "proposito",
    text: "Impacto en el mundo…",
    options: [
      { label: "A", text: "No siento que mis acciones tengan impacto.", value: 1 },
      { label: "B", text: "Creo que podría hacer algo, pero no sé qué.", value: 2 },
      { label: "C", text: "Me interesa contribuir con lo que hago.", value: 3 },
      { label: "D", text: "Trabajo con intención de generar impacto positivo real.", value: 4 }
    ]
  },
  {
    id: "pro_3",
    dimension: "proposito",
    text: "Relación entre valores y trabajo…",
    options: [
      { label: "A", text: "No me lo planteo.", value: 1 },
      { label: "B", text: "Trato de mantenerlos separados.", value: 2 },
      { label: "C", text: "Busco alinear valores con lo que hago.", value: 3 },
      { label: "D", text: "Mi trabajo refleja mis valores fundamentales.", value: 4 }
    ]
  },
  {
    id: "pro_4",
    dimension: "proposito",
    text: "Compromiso con causas o ideas…",
    options: [
      { label: "A", text: "No me involucro.", value: 1 },
      { label: "B", text: "Solo si me lo piden o invitan.", value: 2 },
      { label: "C", text: "Participo si me identifico.", value: 3 },
      { label: "D", text: "Me movilizan profundamente ciertas causas.", value: 4 }
    ]
  },
  {
    id: "pro_5",
    dimension: "proposito",
    text: "¿Qué me motiva a emprender?",
    options: [
      { label: "A", text: "Ganar dinero.", value: 1 },
      { label: "B", text: "Escapar del sistema tradicional.", value: 2 },
      { label: "C", text: "Crear algo propio con sentido.", value: 3 },
      { label: "D", text: "Transformar realidades con mis ideas.", value: 4 }
    ]
  },

  /* ---------- Gestión emocional ---------- */
  {
    id: "emo_1",
    dimension: "emocional",
    text: "En momentos de ansiedad o estrés…",
    options: [
      { label: "A", text: "Me desbordo.", value: 1 },
      { label: "B", text: "Me cuesta, pero intento aguantar.", value: 2 },
      { label: "C", text: "Reconozco lo que siento y busco regularme.", value: 3 },
      { label: "D", text: "Sé gestionar mis emociones con herramientas personales.", value: 4 }
    ]
  },
  {
    id: "emo_2",
    dimension: "emocional",
    text: "Cuando algo me afecta emocionalmente…",
    options: [
      { label: "A", text: "Lo escondo o me aíslo.", value: 1 },
      { label: "B", text: "Me quedo atrapado/a en la emoción.", value: 2 },
      { label: "C", text: "Lo converso con alguien de confianza.", value: 3 },
      { label: "D", text: "Lo proceso y uso para tomar mejores decisiones.", value: 4 }
    ]
  },
  {
    id: "emo_3",
    dimension: "emocional",
    text: "Manejar la crítica…",
    options: [
      { label: "A", text: "Me hiere profundamente.", value: 1 },
      { label: "B", text: "Me cuesta pero no lo muestro.", value: 2 },
      { label: "C", text: "Escucho y decido qué tomar.", value: 3 },
      { label: "D", text: "La agradezco como parte de mi evolución.", value: 4 }
    ]
  },
  {
    id: "emo_4",
    dimension: "emocional",
    text: "Reconocer mis límites…",
    options: [
      { label: "A", text: "Sigo aunque esté agotado/a.", value: 1 },
      { label: "B", text: "Me cuesta decir que no.", value: 2 },
      { label: "C", text: "A veces paro a tiempo.", value: 3 },
      { label: "D", text: "Conozco y respeto mis límites con claridad.", value: 4 }
    ]
  },
  {
    id: "emo_5",
    dimension: "emocional",
    text: "Autoestima frente a desafíos…",
    options: [
      { label: "A", text: "Me desanimo fácilmente.", value: 1 },
      { label: "B", text: "Dudo mucho antes de actuar.", value: 2 },
      { label: "C", text: "Me animo si recibo apoyo o feedback.", value: 3 },
      { label: "D", text: "Confío en mí, incluso en contextos nuevos.", value: 4 }
    ]
  }
];
