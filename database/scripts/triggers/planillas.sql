CREATE OR REPLACE FUNCTION verificar_condiciones_planilla()
RETURNS TRIGGER AS $$
DECLARE
    total_departamentos INTEGER;
    total_centros_costo INTEGER;
    anio_text VARCHAR(255);
BEGIN
    -- Verificar que el año existe
    IF NOT EXISTS (SELECT 1 FROM anio_calendario WHERE id_anio = NEW.id_anio) THEN
        RAISE EXCEPTION 'El año especificado no existe en el calendario' USING ERRCODE = 'P0001';
    END IF;

    -- Obtener el total de departamentos
    SELECT COUNT(*) INTO total_departamentos
    FROM "departamentoEmpresa";

    -- Obtener el total de centros de costo para el año especificado
    SELECT COUNT(*) INTO total_centros_costo
    FROM centro_costo
    WHERE id_anio = NEW.id_anio;

    -- Verificar que exista un centro de costo para cada departamento
    SELECT anio INTO anio_text
    FROM anio_calendario
    WHERE
    id_anio = NEW.id_anio;
    IF total_departamentos != total_centros_costo THEN
        RAISE EXCEPTION 'No existen centros de costo para todos los departamentos en el año %', anio_text USING ERRCODE = 'P0002';    
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE OR REPLACE TRIGGER verificar_condiciones_antes_planilla
    BEFORE INSERT ON planilla
    FOR EACH ROW
    EXECUTE FUNCTION verificar_condiciones_planilla();

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