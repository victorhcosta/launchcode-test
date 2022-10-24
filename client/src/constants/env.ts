const { NEXT_PUBLIC_API_HOST } = process.env;

if (!NEXT_PUBLIC_API_HOST) {
	throw new Error('Váriaveis de ambiente não foram totalmente carregadas');
}

export const ENV = {
	API: NEXT_PUBLIC_API_HOST,
};
