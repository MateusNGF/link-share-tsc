
import * as Handlebars from 'handlebars'
import * as Files from 'fs'
import {resolve} from 'path'

class ClassEnginer {

    public readonly path_templates = `${__dirname}/html`

    build(templateName : string, data : any){
        let template = Files.readFileSync(resolve(`${this.path_templates}/${templateName}.html`), 'utf8')
        return Handlebars.compile(template)(data)
    }
}

export const Templates = new ClassEnginer()