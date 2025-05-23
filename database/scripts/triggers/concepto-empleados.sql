CREATE OR REPLACE PROCEDURE cacular_ingreso_sueldo(
    p_id_planilla BIGINT,
	p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_salario_base numeric(9, 2);
    v_concepto character varying(255) := 'ING_SUE';
	v_id_detalle_planilla BIGINT;
BEGIN
		SELECT salario_base INTO v_salario_base
		FROM empleados
		WHERE id_empleado = p_id_empleado;

		SELECT id_planilla_detalle INTO v_id_detalle_planilla
		FROM planilla_detalle
		WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

		IF EXISTS (SELECT 1 FROM conceptos_empleado WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto) THEN
			UPDATE conceptos_empleado
			SET monto = v_salario_base, fecha = CURRENT_DATE
			WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto;
		ELSE
			INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
			VALUES (v_id_detalle_planilla, v_concepto, v_salario_base, CURRENT_DATE);
		END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE cacular_descuento_isss(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_porcentaje_isss numeric(9, 2) := 0.03;
    v_tope_isss numeric(9, 2) := 30;
    v_salario_base numeric(9, 2);
    v_id_detalle_planilla BIGINT;
    v_concepto character varying(255) := 'DES_ISSS';
BEGIN
    SELECT salario_base INTO v_salario_base
    FROM empleados
    WHERE id_empleado = p_id_empleado;

    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    IF EXISTS (SELECT 1 FROM conceptos_empleado WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto) THEN
        UPDATE conceptos_empleado 
        SET monto = LEAST(v_salario_base * v_porcentaje_isss, v_tope_isss), fecha = CURRENT_DATE
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto;
    ELSE
        INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
        VALUES (v_id_detalle_planilla, v_concepto, LEAST(v_salario_base * v_porcentaje_isss, v_tope_isss), CURRENT_DATE);
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE calcular_aporte_patronal_isss(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_porcentaje_isss numeric(9, 4) := 0.075;
    v_salario_base numeric(9, 2);
    v_id_detalle_planilla BIGINT;
    v_concepto character varying(255) := 'APT_ISSS';
BEGIN
    -- El tope de aporte patronal es de 1000
    SELECT LEAST(salario_base, 1000) INTO v_salario_base
    FROM empleados
    WHERE id_empleado = p_id_empleado;

    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    IF EXISTS (SELECT 1 FROM conceptos_empleado WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto) THEN
        UPDATE conceptos_empleado
        SET monto = v_salario_base * v_porcentaje_isss, fecha = CURRENT_DATE
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto;
    ELSE
        INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
        VALUES (v_id_detalle_planilla, v_concepto, v_salario_base * v_porcentaje_isss, CURRENT_DATE);
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE calcular_aporte_patronal_afp(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_salario_base numeric(9, 2);
    v_id_detalle_planilla BIGINT;
    v_porcentaje_afp numeric(9, 4) := 0.0875;
    v_concepto character varying(255) := 'APT_AFP';
BEGIN
    SELECT salario_base INTO v_salario_base
    FROM empleados
    WHERE id_empleado = p_id_empleado;

    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    IF EXISTS (SELECT 1 FROM conceptos_empleado WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto) THEN
        UPDATE conceptos_empleado
        SET monto = v_salario_base * v_porcentaje_afp, fecha = CURRENT_DATE
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto;
    ELSE
        INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
        VALUES (v_id_detalle_planilla, v_concepto, v_salario_base * v_porcentaje_afp, CURRENT_DATE);
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE calcular_descuento_afp(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_salario_base numeric(9, 2);
    v_id_detalle_planilla BIGINT;
    v_porcentaje_afp numeric(9, 4) := 0.0875;
    v_concepto character varying(255) := 'DES_ISSS';
BEGIN
    SELECT salario_base INTO v_salario_base
    FROM empleados
    WHERE id_empleado = p_id_empleado;
    
    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    IF EXISTS (SELECT 1 FROM conceptos_empleado WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto) THEN
        UPDATE conceptos_empleado
        SET monto = v_salario_base * v_porcentaje_afp, fecha = CURRENT_DATE
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto;
    ELSE
        INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
        VALUES (v_id_detalle_planilla, v_concepto, v_salario_base * v_porcentaje_afp, CURRENT_DATE);
    END IF;
END;
$$;

CREATE OR REPLACE PROCEDURE calcular_descuento_retencion_renta(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_salario_base NUMERIC(9, 2);
    v_descuento_isss NUMERIC(9, 2);
    v_descuento_afp NUMERIC(9, 2);
    v_salario_neto NUMERIC(9, 2);
    v_renta NUMERIC(9, 2) := 0;
    v_id_detalle_planilla BIGINT;
    v_concepto_renta VARCHAR := 'DES_REN';

    -- Variables para tramos
    v_desde NUMERIC(9,2);
    v_hasta NUMERIC(9,2);
    v_cuota_fija NUMERIC(9,2);
    v_porcentaje NUMERIC(9,4);
    v_sobre_exceso NUMERIC(9,2);
BEGIN
    SELECT salario_base INTO v_salario_base
    FROM empleados
    WHERE id_empleado = p_id_empleado;

    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    SELECT monto INTO v_descuento_isss
    FROM conceptos_empleado
    WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = 'DES_ISSS';

    SELECT monto INTO v_descuento_afp
    FROM conceptos_empleado
    WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = 'DES_AFP';

    v_salario_neto := v_salario_base - v_descuento_isss - v_descuento_afp;

    FOR v_desde, v_hasta, v_cuota_fija, v_porcentaje, v_sobre_exceso IN
        SELECT * FROM (
            VALUES
                (0.01, 4064.00, 0.00, 0.00, 0.00),
                (4064.01, 9142.86, 212.12, 0.10, 4064.00),
                (9142.87, 22857.14, 720.00, 0.20, 9142.86),
                (22857.15, NULL, 3462.86, 0.30, 22857.14)
        ) AS tramo(desde, hasta, cuota_fija, porcentaje, sobre_exceso)
    LOOP
        IF (v_salario_neto BETWEEN v_desde AND COALESCE(v_hasta, v_salario_neto)) THEN
            v_renta := v_cuota_fija + (v_salario_neto - v_sobre_exceso) * v_porcentaje;
            EXIT;
        END IF;
    END LOOP;

    IF EXISTS (
        SELECT 1 FROM conceptos_empleado 
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto_renta
    ) THEN
        UPDATE conceptos_empleado
        SET monto = v_renta, fecha = CURRENT_DATE
        WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = v_concepto_renta;
    ELSE
        INSERT INTO conceptos_empleado (id_planilla_detalle, codigo_concepto, monto, fecha)
        VALUES (v_id_detalle_planilla, v_concepto_renta, v_renta, CURRENT_DATE);
    END IF;
END;
$$;

--  CALCULAR TOTALES DETALLE PLANILLA

CREATE OR REPLACE PROCEDURE calcular_totales_detalle_planilla(
    p_id_planilla BIGINT,
    p_id_empleado BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total_ingresos NUMERIC(9, 2) := 0;
    v_total_descuentos NUMERIC(9, 2) := 0;
    v_total_aporte_patronal NUMERIC(9, 2) := 0;
    v_salario_neto NUMERIC(9, 2);
    v_id_detalle_planilla BIGINT;
BEGIN
    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    -- Calcular total de ingresos
    SELECT COALESCE(SUM(ce.monto), 0)
    INTO v_total_ingresos
    FROM conceptos_empleado ce
    JOIN tipos_conceptos tc ON ce.codigo_concepto = tc.codigo
    WHERE ce.id_planilla_detalle = v_id_detalle_planilla
      AND tc.tipo = 'ingreso';

    -- Calcular total de descuentos
    SELECT COALESCE(SUM(ce.monto), 0)
    INTO v_total_descuentos
    FROM conceptos_empleado ce
    JOIN tipos_conceptos tc ON ce.codigo_concepto = tc.codigo
    WHERE ce.id_planilla_detalle = v_id_detalle_planilla
      AND tc.tipo = 'descuento';

    -- Calcular total de aportes patronales
    SELECT COALESCE(SUM(ce.monto), 0)
    INTO v_total_aporte_patronal
    FROM conceptos_empleado ce
    JOIN tipos_conceptos tc ON ce.codigo_concepto = tc.codigo
    WHERE ce.id_planilla_detalle = v_id_detalle_planilla
      AND tc.tipo = 'aporte_patron';

    -- Calcular salario neto
    v_salario_neto := v_total_ingresos - v_total_descuentos;

    -- Actualizar la tabla planilla_detalle
    UPDATE planilla_detalle
    SET total_ingresos = v_total_ingresos,
        total_descuentos = v_total_descuentos,
        total_aporte_patronal = v_total_aporte_patronal,
        salario_neto_total = v_salario_neto
    WHERE id_planilla_detalle = v_id_detalle_planilla;
END;
$$;

--
--
--
--
--
-- CONTEXTO

CREATE TABLE IF NOT EXISTS public.tipos_conceptos (
    codigo character varying(255) COLLATE pg_catalog."default" NOT NULL,
    tipo character varying(255) COLLATE pg_catalog."default" NOT NULL, -- 'ingreso', 'descuento', 'aporte_patron'
    nombre character varying(255) COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT tipos_conceptos_pkey PRIMARY KEY (codigo)
);

CREATE TABLE IF NOT EXISTS public.conceptos_empleado (
    id_concepto_empleado bigserial NOT NULL,
    id_planilla_detalle bigint NOT NULL,
    codigo_concepto character varying(255) COLLATE pg_catalog."default" NOT NULL,
    fecha date NOT NULL,
    monto numeric(9, 2) NOT NULL,
    CONSTRAINT conceptos_empleado_pkey PRIMARY KEY (id_concepto_empleado)
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