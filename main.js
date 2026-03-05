const searchInput = document.querySelector("#search-input");
const muniSelect = document.querySelector("#muni-select");
const nivelSelect = document.querySelector("#nivel-select");
const btnSearch = document.querySelector("#btn-search");
const resultsGrid = document.querySelector("#results-grid");

function ini() {
    
    municipios.data.forEach(muni => {
        
        const option = document.createElement("option");
        option.value = muni;
        option.textContent = muni;
        muniSelect.appendChild(option);
    });

    niveles.data.forEach(nivel => {
        const option = document.createElement("option");
        option.value = nivel;
        option.textContent = nivel;
        nivelSelect.appendChild(option);
    });
}

function search() {
    
    const query = searchInput.value.toLowerCase().trim();
    
    const selectedMuni = muniSelect.value;
    const selectedNivel = nivelSelect.value;

    
    const filteredSchools = escuelas.data.filter(school => {
        
        const matchName = school.nombre.toLowerCase().includes(query);
        const matchMuni = selectedMuni === "" || school.municipio === selectedMuni;
        const matchNivel = selectedNivel === "" || school.nivel === selectedNivel;

        return matchName && matchMuni && matchNivel;
    });

    render(filteredSchools);
}

function render(list) {
    resultsGrid.innerHTML = ""; 

    if (list.length === 0) {
        resultsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No se encontraron resultados.</p>`;
        return;
    }

    list.forEach(school => {
        const cardHTML = 
        `<article class="card">
                <h3>${school.nombre}</h3>
                <p><strong>Clave:</strong> ${school.clave}</p>
                <p><strong>Municipio:</strong> ${school.municipio}</p>
                <p><strong>Nivel:</strong> ${school.nivel}</p>
                <p><strong>Turno:</strong> ${school.turno}</p>
                <p><strong>Control:</strong> ${school.control}</p>
            </article>`;
    
        resultsGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
}

btnSearch.addEventListener("click", search);

ini();