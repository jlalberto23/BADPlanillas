-- Active: 1747843537678@@127.0.0.1@5432@badplanillas
CREATE OR REPLACE PROCEDURE actualizar_planilla_detalle_empleados(
    p_id_planilla BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_anio BIGINT;
    v_empleado RECORD;
    v_id_centro_costo BIGINT;
		v_id_detalle_planiLla_centro_costo BIGINT;
BEGIN
    -- Obtener el id_anio de la planilla
    SELECT id_anio INTO v_id_anio
    FROM planilla
    WHERE id_planilla = p_id_planilla;

    -- Verificar que la planilla existe
    IF v_id_anio IS NULL THEN
        RAISE EXCEPTION 'La planilla con ID % no existe', p_id_planilla USING ERRCODE = 'P0003';
    END IF;

    -- Iterar sobre cada empleado activo
    FOR v_empleado IN 
        SELECT e.id_empleado, e.carnet_empleado, e.salario_base, s.id_seccion, a.id_area, d."id_deptoEmpresa", e.estado
        FROM empleados e
        LEFT JOIN "seccionEmpresa" s ON e.id_seccion = s.id_seccion
        LEFT JOIN "areaEmpresa" a ON s.id_area = a.id_area
        LEFT JOIN "departamentoEmpresa" d ON a."id_deptoEmpresa" = d."id_deptoEmpresa"
    LOOP
        -- Obtener el centro de costo para el departamento y año
        SELECT id_centro_costo INTO v_id_centro_costo
        FROM centro_costo
        WHERE "id_deptoEmpresa" = v_empleado."id_deptoEmpresa"
        AND id_anio = v_id_anio;

        IF v_empleado."id_deptoEmpresa" IS NULL THEN
            RAISE EXCEPTION 'No tiene asignado un departamento el empleado con carnet %', v_empleado.carnet_empleado USING ERRCODE = 'P0004';
        END IF;

        IF v_id_centro_costo IS NULL THEN
            RAISE EXCEPTION 'No tiene asignado un centro de costo el departamento % en el año %', v_empleado."id_deptoEmpresa", v_id_anio USING ERRCODE = 'P0005';
        END IF;

				SELECT id_centro_costo INTO v_id_detalle_planiLla_centro_costo
				FROM planilla_detalle pd
				WHERE id_planilla = p_id_planilla AND id_empleado = v_empleado.id_empleado;

        -- Verificar si ya existe un detalle de planilla para este empleado
        IF v_id_detalle_planiLla_centro_costo IS NOT NULL THEN
            -- Actualizar el detalle de planilla si cambió el centro de costo
            IF v_empleado.estado != 'activo' THEN
                -- Si el empleado ya no está activo, eliminar el detalle
                DELETE FROM planilla_detalle WHERE id_planilla = p_id_planilla AND id_empleado = v_empleado.id_empleado;
            ELSEIF v_id_detalle_planiLla_centro_costo != v_id_centro_costo THEN
                -- Actualizar el centro de costo y mantener los demás valores si ha cambiado
                UPDATE planilla_detalle
                SET id_centro_costo = v_id_centro_costo
                WHERE id_planilla = p_id_planilla 
                AND id_empleado = v_empleado.id_empleado;
            END IF;
        ELSE
        -- Insertar el detalle de planilla
            INSERT INTO planilla_detalle (id_planilla, id_empleado, id_centro_costo)
            VALUES (p_id_planilla, v_empleado.id_empleado, v_id_centro_costo);
        END IF;

        -- Calcular ingresos
        CALL cacular_ingreso_sueldo(p_id_planilla, v_empleado.id_empleado);

        -- Calcular descuentos
        CALL cacular_descuento_isss(p_id_planilla, v_empleado.id_empleado);
        CALL calcular_descuento_afp(p_id_planilla, v_empleado.id_empleado);
        CALL calcular_descuento_retencion_renta(p_id_planilla, v_empleado.id_empleado);

        -- Calcular aportes patronales
        CALL calcular_aporte_patronal_isss(p_id_planilla, v_empleado.id_empleado);
        CALL calcular_aporte_patronal_afp(p_id_planilla, v_empleado.id_empleado);

        -- Calcular totales detalle planilla
        CALL calcular_totales_detalle_planilla(p_id_planilla, v_empleado.id_empleado);
    END LOOP;

    -- Calcular totales planilla
    CALL calcular_totales_planilla(p_id_planilla);
END;
$$;

-- Trigger para actualizar los detalles de la planilla después de insertar una nueva planilla
CREATE OR REPLACE FUNCTION trigger_actualizar_planilla_detalle()
RETURNS trigger AS $$
BEGIN
    -- Llamar al procedimiento pasando el ID de la nueva planilla
    CALL actualizar_planilla_detalle_empleados(NEW.id_planilla);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger

CREATE OR REPLACE TRIGGER crear_planilla_detalle_despues_planilla
    AFTER INSERT ON planilla
    FOR EACH ROW
    EXECUTE FUNCTION trigger_actualizar_planilla_detalle();