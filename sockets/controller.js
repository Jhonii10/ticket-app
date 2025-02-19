const { TicketControl } = require("../models/ticketControl");

const ticketsControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketsControl.ultimo)
    socket.emit('estado-actual', ticketsControl.ultimosCuatro)
    socket.emit('tickets-pendientes', ticketsControl.tickets.length);
    

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketsControl.siguiente();
        callback( siguiente );

    })

    socket.on('atender-ticket', ({escritorio} , callback) => {
        
        if (!escritorio) {
            return callback({
                success: false,
                msg: 'El escritorio es obligatorio'
            })
            
        }

        const ticket = ticketsControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual', ticketsControl.ultimosCuatro)


        if (!ticket) {

            socket.broadcast.emit('tickets-pendientes', ticketsControl.tickets.length);

            callback({
                success: false,
                msg: 'No hay tickets para atender'
            })
        }else{
            callback({
                success: true,
                ticket
            })
        }

        
        
    })

}



module.exports = {
    socketController
}

