const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes')




const searhParams = new URLSearchParams(window.location.search);

if (!searhParams.has('escritorio')) {
   window.location = 'index.html';
   throw new Error('El escritorio es obligatorio'); 
}


const escritorio = searhParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none'

const socket = io();



socket.on('connect', () => {
    
    btnAtender.disabled = false;


});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


socket.on('tickets-pendientes', (ticket)=>{
    lblPendientes.innerText = ticket
})


btnAtender.addEventListener( 'click', () => {


    socket.emit( 'atender-ticket', {escritorio}, ( {success , ticket, msg} ) => {
        
        if (!success) {
            lblTicket.innerText = 'No hay tickets para atender';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket' + ticket.numero;

        
    });

});