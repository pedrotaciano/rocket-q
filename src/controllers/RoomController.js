const Database = require("../db/config")

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let isRoom = true

        // Gera o numero da sala 
        let roomId = Math.floor(Math.random() * 10)
        while (isRoom) {
            for (var i = 0; i < 5; i++) {
                roomId += Math.floor(Math.random() * 10).toString()
            }
            // Verifica se o numero ja existe
            const roomsIdCheck = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsIdCheck.some(roomsIdCheck => roomsIdCheck === roomId)
            if(!isRoom) {
                // Insere a sala no banco de dados 
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    "${pass}"
                )`)
            }        
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()

        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
        let isQuestions = true

        if(questions.length == 0) {
            if(questionsRead == 0) {
                isQuestions = false
            }
        }
        
        res.render('room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions})
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}
