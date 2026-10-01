SELECT
    nome,
    data_nascimento,
    ROW_NUMBER() OVER (
        ORDER BY data_nascimento DESC
    ) AS numero
FROM usuarios;