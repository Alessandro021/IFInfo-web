export const useStorage = () => {

	const KEY = "IFINFOSTORAGE_KEY";
	const salvar = (data) => {
		localStorage.setItem(KEY, JSON.stringify(data));
	};

	const deletar = () => {
		localStorage.removeItem(KEY);
		localStorage.removeItem("noticias");
	};

	const pegar = () => {
		const data =  localStorage.getItem(KEY);

		try {
			if(!data){
				return null;
			}
			JSON.parse(data);
			return data;
		} catch (e) {
			return null;
		}

	};

	return {
		deletar,
		pegar,
		salvar
	};
};