export async function connect(){
	const { createPool } = require('mysql2/promise')

    const connection = await createPool({
        host: 'conceptodigital.net',
        user: 'concepto_pedUser',
        password: 'EFi6sC_Po-^T',
        database: 'concepto_peddb',
        connectionLimit: 10
    });
    return connection;
}