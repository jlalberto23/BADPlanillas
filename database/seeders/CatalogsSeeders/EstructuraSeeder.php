<?php

namespace Database\Seeders\CatalogsSeeders;

use Illuminate\Database\Seeder;
use App\Models\Catalogs\Departamentoempresa;
use App\Models\Catalogs\Areaempresa;
use App\Models\Catalogs\Seccionempresa;

class EstructuraSeeder extends Seeder
{
	private array $estructura = [
		[
			'nombreDepto' => 'Recursos Humanos',
			'descripcionDepto' => 'Gestión del personal y desarrollo organizacional',
			'id_jefeDepto' => null,
			'areas' => [
				[
					'nombreArea' => 'Reclutamiento y Selección',
					'descripcionArea' => 'Proceso de contratación de personal',
					'id_jefeArea' => null,
					'secciones' => [
						[
							'nombreSeccion' => 'Entrevistas y Evaluación',
							'descripcionSeccion' => 'Proceso de entrevistas y evaluación de candidatos',
							'id_jefeSeccion' => null
						],
						[
							'nombreSeccion' => 'Contratación',
							'descripcionSeccion' => 'Gestión de contratos y onboarding',
							'id_jefeSeccion' => null
						]
					]
				],
				[
					'nombreArea' => 'Compensaciones y Beneficios',
					'descripcionArea' => 'Gestión de salarios y prestaciones',
					'id_jefeArea' => null,
					'secciones' => [
						[
							'nombreSeccion' => 'Nómina',
							'descripcionSeccion' => 'Procesamiento y control de nómina',
							'id_jefeSeccion' => null
						],
						[
							'nombreSeccion' => 'Prestaciones',
							'descripcionSeccion' => 'Administración de beneficios y prestaciones',
							'id_jefeSeccion' => null
						]
					]
				]
			]
		],
		[
			'nombreDepto' => 'Tecnología',
			'descripcionDepto' => 'Desarrollo y soporte tecnológico',
			'id_jefeDepto' => null,
			'areas' => [
				[
					'nombreArea' => 'Desarrollo de Software',
					'descripcionArea' => 'Creación y mantenimiento de aplicaciones',
					'id_jefeArea' => null,
					'secciones' => [
						[
							'nombreSeccion' => 'Frontend',
							'descripcionSeccion' => 'Desarrollo de interfaces de usuario',
							'id_jefeSeccion' => null
						],
						[
							'nombreSeccion' => 'Backend',
							'descripcionSeccion' => 'Desarrollo de servicios y APIs',
							'id_jefeSeccion' => null
						]
					]
				],
				[
					'nombreArea' => 'Infraestructura',
					'descripcionArea' => 'Gestión de servidores y redes',
					'id_jefeArea' => null,
					'secciones' => [
						[
							'nombreSeccion' => 'Redes',
							'descripcionSeccion' => 'Administración de redes y comunicaciones',
							'id_jefeSeccion' => null
						],
						[
							'nombreSeccion' => 'Servidores',
							'descripcionSeccion' => 'Gestión de servidores y cloud',
							'id_jefeSeccion' => null
						]
					]
				]
			]
		]
	];

	public function run()
	{
		foreach ($this->estructura as $deptoData) {
			$areas = $deptoData['areas'];
			unset($deptoData['areas']);

			$departamento = Departamentoempresa::firstOrCreate(
				['nombreDepto' => $deptoData['nombreDepto']],
				$deptoData
			);

			foreach ($areas as $areaData) {
				$secciones = $areaData['secciones'];
				unset($areaData['secciones']);

				$areaData['id_deptoEmpresa'] = $departamento->id_deptoEmpresa;

				$area = Areaempresa::firstOrCreate(
					[
						'nombreArea' => $areaData['nombreArea'],
						'id_deptoEmpresa' => $departamento->id_deptoEmpresa
					],
					$areaData
				);

				foreach ($secciones as $seccionData) {
					$seccionData['id_area'] = $area->id_area;

					Seccionempresa::firstOrCreate(
						[
							'nombreSeccion' => $seccionData['nombreSeccion'],
							'id_area' => $area->id_area
						],
						$seccionData
					);
				}
			}
		}
	}
}
