
let attenregexp = /attendance/;
let loyalregexp = /loyal/;
let members = data.results[0].members;
let statics = {
    rep: 0,
    dem: 0,
    ind: 0,
    lengthshow: [],
    nombrepartido: ["Republicanos", "Demócratas", "Independentistas", "Total"],
    porcentajeRep: [],
    porcentajeDem: [],
    porcentajeInd: [],
    porcentajetotal: [],
    sumaRep: 0, sumaDem: 0, sumaInd: 0,
    mediaRep: 0, mediaDem: 0, mediaInd: 0
}
let tbody = document.getElementById("Glance");

function showHouseTable() {

    //loop base
    for (let i = 0; i < members.length; i++) {

        //house/senate at a glance
        if (members[i].party == "R") {
            statics.rep++;
            statics.porcentajeRep.push(members[i].votes_with_party_pct);
        }
        else if (members[i].party == "D") {
            statics.dem++;
            statics.porcentajeDem.push(members[i].votes_with_party_pct);
        }
        else {
            statics.ind++;
            statics.porcentajeInd.push(members[i].votes_with_party_pct);
        }
    }

    for (let j = 0; j < statics.porcentajeRep.length; j++) {
        statics.sumaRep += statics.porcentajeRep[j];
    }
    statics.mediaRep = statics.sumaRep / statics.porcentajeRep.length;

    for (let x = 0; x < statics.porcentajeDem.length; x++) {
        statics.sumaDem += statics.porcentajeDem[x];
    }
    statics.mediaDem = statics.sumaDem / statics.porcentajeDem.length;

    for (let y = 0; y < statics.porcentajeInd.length; y++) {
        statics.sumaInd += statics.porcentajeInd[y];
    }
    statics.mediaInd = statics.sumaInd / statics.porcentajeInd.length;

    statics.porcentajetotal.push(statics.mediaRep, statics.mediaDem, statics.mediaInd, ((statics.mediaDem + statics.mediaInd + statics.mediaRep) / 3));

    statics.lengthshow.push(statics.rep, statics.dem, statics.ind, (statics.rep + statics.dem + statics.ind));

    let template = "";
    for (let z = 0; z < statics.nombrepartido.length; z++) {
        template += `
            <tr>
                <td>${statics.nombrepartido[z]}</td>
                <td>${statics.lengthshow[z]}</td>
                <td>${statics.porcentajetotal[z].toFixed(2)}</td>
            </tr>`;
    }
    tbody.innerHTML = template;
}
console.log(showHouseTable());

//slecciona o loyal o attendance
if (attenregexp.exec(document.URL)) {
    searchAttendance();
}
else if (loyalregexp.exec(document.URL)) {
    searchLoyal();
}
//-------------------------------------------------------------------------------------------------------


//loyal people
function searchLoyal() {

    //imprime los menos leales
    members.sort(function (a, b) {
        return (a.votes_with_party_pct - b.votes_with_party_pct);
    });
    let tenprc = members.length * 0.1;
    let template_less = "";

    for (let i = 0; i < tenprc; i++) {
        template_less += `
        <tr>
            <td><a href="${members[i].url}">${members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name}</a></td>
            <td>${members[i].total_votes}</td>
            <td>${members[i].votes_with_party_pct}</td>
        </tr>`;
    }

    //imprime los mas leales
    members.sort(function (a, b) {
        return (b.votes_with_party_pct - a.votes_with_party_pct);

    });
    let template_most = "";

    for (let i = 0; i < tenprc; i++) {
        template_most += `
        <tr>
            <td><a href="${members[i].url}">${members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name}</a></td>
            <td>${members[i].total_votes}</td>
            <td>${members[i].votes_with_party_pct}</td>
        </tr>`;
    }
    document.getElementById("lessLoyal").innerHTML = template_less;
    document.getElementById("mostLoyal").innerHTML = template_most;
}

//-----------------------------------------------------------------------------------------------

//Asistencia

function searchAttendance() {

    //imprime los mas leales
    members.sort(function (a, b) {
        return (a.missed_votes_pct - b.missed_votes_pct)
    });

    let tenprc = members.length * 0.1;
    let template_mostatt = "";
    //
    for (let i = 0; i < tenprc; i++) {
        template_mostatt += `
        <tr>
            <td><a href="${members[i].url}">${members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name}</a></td>
            <td>${members[i].missed_votes}</td>
            <td>${members[i].missed_votes_pct}</td>
        </tr>`;
    }

    //imprimir menos leales
    members.sort(function (a, b) {
        return (b.missed_votes_pct - a.missed_votes_pct);
    });
    let template_lessatt = "";

    for (let i = 0; i < tenprc; i++) {
        template_lessatt += `
        <tr>
            <td><a href="${members[i].url}">${members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name}</a></td>
            <td>${members[i].missed_votes}</td>
            <td>${members[i].missed_votes_pct}</td>
        </tr>`;
    }
    document.getElementById("lessEngaged").innerHTML = template_lessatt;
    document.getElementById("mostEngaged").innerHTML = template_mostatt;
}