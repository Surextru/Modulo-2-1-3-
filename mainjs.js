// filtro de estado
let stateArray = data.results[0].members;
let filterstate = document.getElementById("stateFilter");
let statefilter = [];

function showState() {
    for (let i = 0; i < stateArray.length; i++) {
        if (!(statefilter.includes(stateArray[i].state))) {
            statefilter.push(stateArray[i].state);
        }
    }
    let ordenatedstate = statefilter.sort();
    console.log(ordenatedstate);
    let template = "";
    template = `<option value="All"> All </option>`;

    for (let i = 0; i < ordenatedstate.length; i++) {
        template += `<option value="${ordenatedstate[i]}">${ordenatedstate[i]}</option>`;
    };
    filterstate.innerHTML = template;
}
console.log(showState());


// -------------------------------------------------------------------------------------
//filtro de partido

let members = data.results[0].members;

let tbody = document.getElementById("tablebody");

//Listeners
document.getElementById("rep").addEventListener("change", sayHello);
document.getElementById("dem").addEventListener("change", sayHello);
document.getElementById("ind").addEventListener("change", sayHello);
document.getElementById("stateFilter").addEventListener("change", sayHello);

//We need to execute this function to see the first table
printTable();

// Function to print the table
function printTable() {
    let template = "";
    members.forEach(function (member) {
        template += `
                    <tr>
                      <td><a href="${member.url}">${member.first_name + " " + (member.middle_name || "") + " " + member.last_name}</a></td>
                      <td>${member.party}</td>
                      <td>${member.state}</td>
                      <td>${member.seniority}</td>
                      <td>${member.votes_with_party_pct}</td>
                    </tr>`;
    });
    tbody.innerHTML = template;
}

//Function executed when the cb are clicked
function sayHello() {
    let repCb = document.getElementById("rep");
    let demCb = document.getElementById("dem");
    let indCb = document.getElementById("ind");
    let template = "";
    let checkeados = [];

    if (repCb.checked) {
        checkeados.push("R");
    }
    if (demCb.checked) {
        checkeados.push("D");
    }
    if (indCb.checked) {
        checkeados.push("I");
    }
    if (!repCb.checked && !demCb.checked && !indCb.checked) {
        checkeados.push("R", "D", "I");
    }
    let membersToPrint = [];
    members.forEach(function (member) {
        var selecstate = document.getElementById("stateFilter").value;
        if ((checkeados.includes(member.party)) && ((member.state == selecstate) || (selecstate == "All"))) {
            membersToPrint.push(member);
        }
    });
    printNewTable(membersToPrint);
}

//Function that prints the news members
function printNewTable(miembrosAImprimir) {
    let template = "";

    miembrosAImprimir.forEach(function (member) {
        template += `
                    <tr>
                        <td><a href="${member.url}">${member.first_name + " " + (member.middle_name || "") + " " + member.last_name}</a></td>
                        <td>${member.party}</td>
                        <td>${member.state}</td>
                        <td>${member.seniority}</td>
                        <td>${member.votes_with_party_pct}</td>
                    </tr>`;
    });
    tbody.innerHTML = template;
}
printNewTable(members);

//--------------------------------------------------------------------------------------

