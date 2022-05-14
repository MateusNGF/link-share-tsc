import { exec, spawn } from 'child_process'

let isON = (url) => {
    exec(`ping ${url}`, (e, s) => {
        if (!!e){
            console.log("erro", e)
        }
        if (s.indexOf("Recebidos")){
            console.log("recebeu")
        }
        console.log("s", s)
    })
}


isON('pt.pornhub.com')