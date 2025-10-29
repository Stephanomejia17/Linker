Quiero que actualices todas mis entidades TypeORM para Oracle, de modo que cada tabla tenga su propio ID generado por una secuencia.

📌 Requisitos:

1. Cada entidad debe tener un decorador @PrimaryGeneratedColumn con los siguientes parámetros:
   {
   type: 'number',
   name: 'id_certificado',
   }

2. El nombre de la secuencia debe seguir la convención:
   <nombre_de_la_tabla>\_seq
   Ejemplo:

    - users → users_seq
    - empresas → empresas_seq
    - postulantes → postulantes_seq
    - vacantes → vacantes_seq
    - idiomas → idiomas_seq
    - habilidades → habilidades_seq
    - postulante_habilidades → postulante_habilidades_seq
    - vacante_habilidades → vacante_habilidades_seq
    - postulante_idiomas → postulante_idiomas_seq
    - vacante_idiomas → vacante_idiomas_seq
    - certificados → certificados_seq
    - detalles_certificados → detalles_certificados_seq
    - estudios → estudios_seq
    - detalles_estudios → detalles_estudios_seq
    - matches → matches_seq

3. Mantén el resto de columnas y relaciones exactamente igual.

4. No agregues ni quites decoradores ni propiedades adicionales. Solo modifica el campo del ID para usar la estrategia de generación por secuencia.

5. Asegúrate de importar correctamente los decoradores de TypeORM (`Entity`, `PrimaryGeneratedColumn`, `Column`, etc.).

💡 Ejemplo del formato esperado:

```ts
@PrimaryGeneratedColumn('increment', {
  type: 'number',
  name: 'id_certificado',
})
id: number;
```
