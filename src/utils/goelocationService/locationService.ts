export const getCurrrentLocation = async ()=> {
const url = 'https://cameroon1.p.rapidapi.com/georev?lat=4.1591154&lon=9.2805172';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
		'X-RapidAPI-Host': 'cameroon1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}


}