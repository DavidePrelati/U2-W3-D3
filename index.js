const fetchLibrary = () => {
   
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => {
            console.log(response)

            if (response.ok) {
                
                return response.json()
            } else {
                
                if (response.status === 400) { throw new Error("Bad Request") }
                if (response.status === 401) { throw new Error("Unauthorized") }
                if (response.status === 403) { throw new Error("Forbidden") }
                if (response.status === 404) { throw new Error("Not Found") }
                if (response.status === 500) { throw new Error("Server Error") }

                throw new Error("Generic Fetch Error")

            }
        })
        .then((libraryData) => {
           
            console.log(libraryData)


            const row = document.getElementById("books-row")
            libraryData.forEach(book => {

                const col = document.createElement("col")
                col.classList.add("col")
                const card = document.createElement("div")
                card.classList.add("card")

                card.innerHTML = `
                <img src=${book.img} class="card-img-top" alt="...">
                <div class="card-body bg-black text-white">
                    <p class="card-text">${book.title}</p>
                    <p class="card-text">${book.price}</p>
                    <button class="btn btn-danger me-md-2" onclick="discardCard(event)" type="button">Scarta</button>
                </div>`

                col.appendChild(card)
                row.appendChild(col)
            })
        })
        .catch((error) => console.log(error))
}

const discardCard = (event) => {
    const card = event.target.closest('.card');
    card.parentNode.remove();
}

window.onload = () => {
    fetchLibrary()
}
