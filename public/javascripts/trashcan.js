const trashcans = document.querySelectorAll(".trashcan");

trashcans.forEach(trashcan => {
    trashcan.addEventListener("click", (e) => {
        console.log(e.target.dataset.doc);
        const endpoint = `/fridge/${e.target.dataset.doc}`;

        fetch(endpoint, {
            method: "DELETE"
        })
            // .then((response) => response.json()) // Return the response
            .then((data) => {
                console.log(data);
                window.location.href = "/fridge";
                    if (data.success) {
                    // Find the parent <li> element and remove it from the DOM
                    const consumableElement = e.target.closest("li");
                    if (consumableElement) {
                        consumableElement.remove();
                    }
                }
            })
            .catch(err => console.log(err));
        });

});