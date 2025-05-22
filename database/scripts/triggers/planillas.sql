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