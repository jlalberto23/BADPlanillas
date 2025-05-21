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

CREATE OR REPLACE PROCEDURE actualizar_planilla_detalle_empleados(
    p_id_planilla BIGINT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_id_anio BIGINT;
    v_empleado RECORD;
    v_id_centro_costo BIGINT;
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
        SELECT e.id_empleado, e.salario_base, s.id_seccion, a.id_area, d."id_deptoEmpresa", e.estado
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

        IF v_id_centro_costo IS NULL THEN
            RAISE EXCEPTION 'No existe un centro de costo para el departamento % en el año %', v_empleado."id_deptoEmpresa", v_id_anio USING ERRCODE = 'P0004';
        END IF;

        -- Verificar si ya existe un detalle de planilla para este empleado
        IF EXISTS (SELECT 1 FROM planilla_detalle pd WHERE id_planilla = p_id_planilla AND id_empleado = v_empleado.id_empleado) THEN
            -- Actualizar el detalle de planilla si cambió el centro de costo
            IF v_empleado.estado = 'activo' THEN
                -- Si el empleado ya no está activo, eliminar el detalle
                DELETE FROM planilla_detalle WHERE id_planilla = p_id_planilla AND id_empleado = v_empleado.id_empleado;
            ELSEIF id_centro_costo != v_id_centro_costo THEN
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
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION trigger_actualizar_planilla_detalle()
RETURNS trigger AS $$
BEGIN
    -- Llamar al procedimiento pasando el ID de la nueva planilla
    CALL actualizar_planilla_detalle_empleados(NEW.id_planilla);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE OR REPLACE TRIGGER verificar_condiciones_antes_planilla
    BEFORE INSERT ON planilla
    FOR EACH ROW
    EXECUTE FUNCTION verificar_condiciones_planilla();

CREATE OR REPLACE TRIGGER crear_planilla_detalle_despues_planilla
    AFTER INSERT ON planilla
    FOR EACH ROW
    EXECUTE FUNCTION trigger_actualizar_planilla_detalle();