-- CONTEXTO:

CREATE TABLE IF NOT EXISTS public."departamentoEmpresa" (
    "id_deptoEmpresa" bigserial NOT NULL,
    "nombreDepto" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "descripcionDepto" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "id_jefeDepto" bigint,
    CONSTRAINT "departamentoEmpresa_pkey" PRIMARY KEY ("id_deptoEmpresa")
);

CREATE TABLE IF NOT EXISTS public.anio_calendario (
    id_anio bigserial NOT NULL,
    anio integer NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'activo'::character varying,
    CONSTRAINT anio_calendario_pkey PRIMARY KEY (id_anio),
    CONSTRAINT anio_calendario_anio_unique UNIQUE (anio)
);

CREATE TABLE IF NOT EXISTS public.planilla (
    id_planilla bigserial NOT NULL,
    id_anio bigint NOT NULL,
    estado character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'activo'::character varying,
    mes character varying(255) COLLATE pg_catalog."default" NOT NULL,
    fecha_generacion date,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    total_ingresos numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    total_descuentos numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    total_aporte_patronal numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    salario_neto_total numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT planilla_pkey PRIMARY KEY (id_planilla),
    CONSTRAINT planilla_id_anio_mes_unique UNIQUE (id_anio, mes)
);

CREATE TABLE IF NOT EXISTS public.centro_costo (
    id_centro_costo bigserial NOT NULL,
    "id_deptoEmpresa" bigint NOT NULL,
    id_anio bigint NOT NULL,
    presupuesto_total numeric(9, 2) NOT NULL,
    presupuesto_restante numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT centro_costo_pkey PRIMARY KEY (id_centro_costo),
    CONSTRAINT centro_costo_id_deptoempresa_id_anio_unique UNIQUE ("id_deptoEmpresa", id_anio)
);

CREATE TABLE IF NOT EXISTS public.planilla_detalle (
    id_planilla_detalle bigserial NOT NULL,
    id_planilla bigint NOT NULL,
    id_empleado bigint NOT NULL,
    id_centro_costo bigint NOT NULL,
    total_ingresos numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    total_descuentos numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    total_aporte_patronal numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    salario_neto_total numeric(9, 2) NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT planilla_detalle_pkey PRIMARY KEY (id_planilla_detalle),
    CONSTRAINT planilla_detalle_id_planilla_detalle_id_empleado_unique UNIQUE (
        id_planilla_detalle,
        id_empleado
    )
);

CREATE TABLE IF NOT EXISTS public."areaEmpresa" (
    id_area bigserial NOT NULL,
    "nombreArea" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "descripcionArea" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "id_jefeArea" bigint,
    "id_deptoEmpresa" bigint,
    CONSTRAINT "areaEmpresa_pkey" PRIMARY KEY (id_area)
);

CREATE TABLE IF NOT EXISTS public."seccionEmpresa" (
    id_seccion bigserial NOT NULL,
    "nombreSeccion" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "descripcionSeccion" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "id_jefeSeccion" bigint,
    id_area bigint,
    CONSTRAINT "seccionEmpresa_pkey" PRIMARY KEY (id_seccion)
);

CREATE TABLE IF NOT EXISTS public.empleados (
    id_empleado bigserial NOT NULL,
    primer_nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    segundo_nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    apellido_paterno character varying(255) COLLATE pg_catalog."default" NOT NULL,
    apellido_materno character varying(255) COLLATE pg_catalog."default" NOT NULL,
    apellido_casada character varying(255) COLLATE pg_catalog."default",
    fecha_nacimiento date NOT NULL,
    fecha_ingreso date NOT NULL,
    numero_documento character varying(20) COLLATE pg_catalog."default",
    dui character varying(9) COLLATE pg_catalog."default" NOT NULL,
    nit character varying(14) COLLATE pg_catalog."default" NOT NULL,
    codigo_isss character varying(9) COLLATE pg_catalog."default" NOT NULL,
    codigo_nup character varying(9) COLLATE pg_catalog."default" NOT NULL,
    salario_base numeric(9, 2) NOT NULL,
    estado_civil character varying(255) COLLATE pg_catalog."default" NOT NULL,
    sexo character varying(1) COLLATE pg_catalog."default" NOT NULL,
    correo_personal character varying(255) COLLATE pg_catalog."default" NOT NULL,
    correo_institucional character varying(255) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(255) COLLATE pg_catalog."default" NOT NULL,
    carnet_empleado character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tipo_documento character varying(255) COLLATE pg_catalog."default" NOT NULL,
    id_profesion bigint,
    id_puesto bigint,
    id_seccion bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT empleados_pkey PRIMARY KEY (id_empleado),
    CONSTRAINT empleados_carnet_empleado_unique UNIQUE (carnet_empleado),
    CONSTRAINT empleados_codigo_isss_unique UNIQUE (codigo_isss),
    CONSTRAINT empleados_codigo_nup_unique UNIQUE (codigo_nup),
    CONSTRAINT empleados_correo_institucional_unique UNIQUE (correo_institucional),
    CONSTRAINT empleados_correo_personal_unique UNIQUE (correo_personal),
    CONSTRAINT empleados_dui_unique UNIQUE (dui),
    CONSTRAINT empleados_nit_unique UNIQUE (nit)
);