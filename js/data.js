const people = [
    { name: "Amina Hassan", age: 24, city: "Cairo" },
    { name: "Omar Farouk", age: 31, city: "Alexandria" },
    { name: "Laila Nabil", age: 19, city: "Giza" },
    { name: "Youssef Adel", age: 27, city: "Mansoura" },
    { name: "Mariam Samir", age: 22, city: "Cairo" },
    { name: "Karim Fawzy", age: 35, city: "Aswan" }
];

const rows = document.querySelector("#people-rows");
const search = document.querySelector("#table-search");
const tableStatus = document.querySelector("#table-status");
let sortKey = "name";
let sortDirection = 1;

function renderPeople() {
    const query = search.value.trim().toLocaleLowerCase();
    const visiblePeople = people
        .filter((person) => Object.values(person).some((value) => String(value).toLocaleLowerCase().includes(query)))
        .sort((a, b) => {
            const comparison = typeof a[sortKey] === "number"
                ? a[sortKey] - b[sortKey]
                : a[sortKey].localeCompare(b[sortKey]);
            return comparison * sortDirection;
        });

    rows.replaceChildren(...visiblePeople.map((person) => {
        const row = document.createElement("tr");
        [person.name, person.age, person.city].forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        });
        return row;
    }));
    tableStatus.textContent = `${visiblePeople.length} ${visiblePeople.length === 1 ? "person" : "people"} shown.`;
}

search.addEventListener("input", renderPeople);
document.querySelector("#sort-name").addEventListener("click", () => {
    sortDirection = sortKey === "name" ? sortDirection * -1 : 1;
    sortKey = "name";
    renderPeople();
});
document.querySelector("#sort-age").addEventListener("click", () => {
    sortDirection = sortKey === "age" ? sortDirection * -1 : 1;
    sortKey = "age";
    renderPeople();
});
renderPeople();
