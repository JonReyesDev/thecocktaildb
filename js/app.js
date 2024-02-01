function buscarCocktail() {
    const inputNombre = document.getElementById('txtNombre').value;

    if (inputNombre.trim() !== '') {
        const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputNombre}`;

        axios.get(apiUrl)
            .then(response => {
                const coctel = response.data.drinks[0];
                mostrarInfoCoctel(coctel);
            })
            .catch(error => {
                console.error('Error al consultar la API', error);
                mostrarError();
            });
    } else {
        alert('Por favor, ingrese el nombre del coctel.');
    }
}

function mostrarInfoCoctel(coctel) {
    const cocktailInfoDiv = document.getElementById('cocktailInfo');

    if (coctel) {
        const html = `
            <h2>${coctel.strDrink}</h2>
            <p><strong>Categoría:</strong> ${coctel.strCategory}</p>
            <p><strong>Instrucciones:</strong> ${coctel.strInstructions}</p>
            <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" style="max-width: 300px;">
        `;
        cocktailInfoDiv.innerHTML = html;
    } else {
        cocktailInfoDiv.innerHTML = '<p>No se encontraron resultados para el coctel.</p>';
    }
}

function mostrarError() {
    const cocktailInfoDiv = document.getElementById('cocktailInfo');
    cocktailInfoDiv.innerHTML = '<p style="color:red;">Esa bebida no esta registrada. Ingrese otra por favor.</p>';
}

function limpiarCocktail() {
    document.getElementById('txtNombre').value = '';
    document.getElementById('cocktailInfo').innerHTML = '';
}