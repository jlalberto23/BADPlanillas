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
    v_porcentaje_afp numeric(9, 4) := 0.0725;
    v_concepto character varying(255) := 'DES_AFP';
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
    v_descuento_isss NUMERIC(9, 2) := 0;
    v_descuento_afp NUMERIC(9, 2) := 0;
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

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Empleado no encontrado con ID %', p_id_empleado;
    END IF;

    SELECT id_planilla_detalle INTO v_id_detalle_planilla
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla AND id_empleado = p_id_empleado;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No existe detalle de planilla para el empleado % en planilla %', p_id_empleado, p_id_planilla;
    END IF;

    SELECT monto INTO v_descuento_isss
    FROM conceptos_empleado
    WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = 'DES_ISSS'
    LIMIT 1;

    IF NOT FOUND THEN
        v_descuento_isss := 0;
    END IF;

    SELECT monto INTO v_descuento_afp
    FROM conceptos_empleado
    WHERE id_planilla_detalle = v_id_detalle_planilla AND codigo_concepto = 'DES_AFP'
    LIMIT 1;

    IF NOT FOUND THEN
        v_descuento_afp := 0;
    END IF;

    v_salario_neto := v_salario_base - v_descuento_isss - v_descuento_afp;
    RAISE NOTICE 'Salario Neto: %', v_salario_neto;

    FOR v_desde, v_hasta, v_cuota_fija, v_porcentaje, v_sobre_exceso IN
        SELECT * FROM (
            VALUES
                (0.01, 472.00, 0.00, 0.00, 0.00),
                (472.01, 895.24, 17.67, 0.10, 472.00),
                (895.25, 2038.10, 60.00, 0.20, 895.24),
                (2038.11, NULL, 288.57, 0.30, 2038.10)
        ) AS tramo(desde, hasta, cuota_fija, porcentaje, sobre_exceso)
    LOOP
        IF v_salario_neto >= v_desde AND (v_hasta IS NULL OR v_salario_neto <= v_hasta) THEN
            v_renta := v_cuota_fija + (v_salario_neto - v_sobre_exceso) * v_porcentaje;
            RAISE NOTICE 'Tramo aplicado: desde % hasta % renta calculada: %', v_desde, v_hasta, v_renta;
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

CREATE OR REPLACE PROCEDURE calcular_totales_planilla(
    p_id_planilla BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_total_ingresos NUMERIC(9, 2) := 0;
    v_total_descuentos NUMERIC(9, 2) := 0;
    v_total_aporte_patronal NUMERIC(9, 2) := 0;
    v_salario_neto_total NUMERIC(9, 2) := 0;
BEGIN
    -- Calcular totales sumando desde planilla_detalle
    SELECT 
        COALESCE(SUM(total_ingresos), 0),
        COALESCE(SUM(total_descuentos), 0),
        COALESCE(SUM(total_aporte_patronal), 0),
        COALESCE(SUM(salario_neto_total), 0)
    INTO 
        v_total_ingresos,
        v_total_descuentos,
        v_total_aporte_patronal,
        v_salario_neto_total
    FROM planilla_detalle
    WHERE id_planilla = p_id_planilla;

    -- Actualizar la planilla con los totales calculados
    UPDATE planilla
    SET total_ingresos = v_total_ingresos,
        total_descuentos = v_total_descuentos,
        total_aporte_patronal = v_total_aporte_patronal,
        salario_neto_total = v_salario_neto_total
    WHERE id_planilla = p_id_planilla;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No se encontró la planilla con ID %', p_id_planilla;
    END IF;
END;
$$;