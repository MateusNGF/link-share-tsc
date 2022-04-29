
import XLSX from 'xlsx-populate';
import * as fs from 'fs'

class Excel {

    private workBook;
    private sheetBook;

    public _default_style : Excel.Style = {
        width : 10,
        height: 10,
        text_color : "#000000",
        background_color : "e8650c"
    }
    
    constructor(
        public readonly SheetName : string,
        public readonly columnsName : Array<string>,
        public readonly ColumnsData : Array<Array<any>>,
        private readonly columnsCustomStyle ?: Array<Excel.CustomColumn>
    ){
        this.build()
    }

    private async build(){
        try{
            this.workBook = await XLSX.fromBlankAsync()
            this.sheetBook = this.workBook.sheet(0).name(this.SheetName)
    
            this._buildHeader()
            this._populate()
    
            let file = await this.workBook.outputAsync()
            fs.writeFileSync(`${this.SheetName}.xlsx`, file)
        }catch(erro){
            console.log(erro.message);
        }
    }

    private _buildHeader()  {
        // APLICAR ESTILOS NAS CELULAS
        for (let i=1;i<=this.columnsName.length;i++) {
            let column : string = Excel.alphabeticCode(i)
            let realIndex = i-1

            if (!!this.columnsCustomStyle && !!this.columnsCustomStyle.length){
                this.columnsCustomStyle.map((customStyle : Excel.CustomColumn) => {
                    if (
                        String(customStyle.column_name).toLowerCase() == this.columnsName[realIndex].toLocaleLowerCase()
                    ){
                        console.log(this.columnsName[realIndex])
                        this._setStyle({ column : column, row : 1}, customStyle.style)
                    }else this._setStyle({ column : column, row : 1})
                })
            }

          
        }

        // POPULAR AS CELULAS
        this.columnsName.forEach((column, index) => {
            this.sheetBook.cell(`${Excel.alphabeticCode(index + 1)}1`).value(column)
        })
    }


    private _populate(){
        let row = 2;
        for (const ColumnData of this.ColumnsData) {
            for (let i = 1; i < this.columnsName.length; i++) {
                if (ColumnData.length != this.columnsName.length) throw { message : "Tamanhos invalidos"}
                let cellValue = ColumnData[i-1]
                this.sheetBook.cell(`${Excel.alphabeticCode(i)}${row}`).value(cellValue)
            }
            row++
        }
    }


    private _setStyle(
        location : { column : string, row : number }, 
        settings?: Excel.Style
    ){

        settings = this._cloneStyle(settings, this._default_style)
 
        let position = `${location.column}${location.row}`

        this.sheetBook.column(location.column).width(settings.width) // Tamanho da celula
        this.sheetBook.row(location.row).height(settings.height) // Altura da celula
        this.sheetBook.cell(position).style("fill", { // BackGround da celula
            type: "solid",
            color: settings.background_color
        });
    }

    private _cloneStyle(current : any, to : any){
        console.log(current);
        console.log(to);
        
        if (!!current){
            for (const props in to) {
                if (!current[props]){
                    current[props] = to[props]
                }
            }
        }else{
            current = to
        }

        console.log(current);
        return current
    }


    static alphabeticCode(index : number){
        return (index) > 26 
        ? String.fromCharCode((index) / 26 + 64) + String.fromCharCode((index) % 26 + 64) 
        : String.fromCharCode((index) + 64)
    }

}


namespace Excel {
    export type Style = {
        text_color?: string,
        background_color?: string,
        width?: number,
        height?: number
    }

    export type CustomColumn = {
        column_name: string,
        style: Style
    }
}


let data = [
    { id_link: 14, type: "Linkdin", tag: null, url: "www.linkedin.com/in/MateusNicolau", createdAt: "2022-04-27T12:09:07.226Z", updateAt: "2022-04-27T12:09:07.226Z" },
    { id_link: 15, type: "Instagram", tag: null, url: "https://www.instagram.com/m.nicolau.g.f/", createdAt: "2022-04-27T12:10:59.536Z", updateAt: "2022-04-27T12:10:59.536Z" },
    { id_link: 16, type: "Facebook", tag: null, url: "https://duckduckgo.com/?t=ffab&q=xlsx+style&atb=v319-6__&ia=web", createdAt: "2022-04-27T23:49:20.544Z", updateAt: "2022-04-27T23:49:20.544Z" },
    { id_link: 14, type: "Linkdin", tag: null, url: "www.linkedin.com/in/MateusNicolau", createdAt: "2022-04-27T12:09:07.226Z", updateAt: "2022-04-27T12:09:07.226Z" },
    { id_link: 15, type: "Instagram", tag: null, url: "https://www.instagram.com/m.nicolau.g.f/", createdAt: "2022-04-27T12:10:59.536Z", updateAt: "2022-04-27T12:10:59.536Z" },
    { id_link: 16, type: "Facebook", tag: null, url: "https://duckduckgo.com/?t=ffab&q=xlsx+style&atb=v319-6__&ia=web", createdAt: "2022-04-27T23:49:20.544Z", updateAt: "2022-04-27T23:49:20.544Z" },
    { id_link: 14, type: "Linkdin", tag: null, url: "www.linkedin.com/in/MateusNicolau", createdAt: "2022-04-27T12:09:07.226Z", updateAt: "2022-04-27T12:09:07.226Z" },
    { id_link: 15, type: "Instagram", tag: null, url: "https://www.instagram.com/m.nicolau.g.f/", createdAt: "2022-04-27T12:10:59.536Z", updateAt: "2022-04-27T12:10:59.536Z" },
    { id_link: 16, type: "Facebook", tag: null, url: "https://duckduckgo.com/?t=ffab&q=xlsx+style&atb=v319-6__&ia=web", createdAt: "2022-04-27T23:49:20.544Z", updateAt: "2022-04-27T23:49:20.544Z" },
    { id_link: 14, type: "Linkdin", tag: null, url: "www.linkedin.com/in/MateusNicolau", createdAt: "2022-04-27T12:09:07.226Z", updateAt: "2022-04-27T12:09:07.226Z" },
    { id_link: 15, type: "Instagram", tag: null, url: "https://www.instagram.com/m.nicolau.g.f/", createdAt: "2022-04-27T12:10:59.536Z", updateAt: "2022-04-27T12:10:59.536Z" },
    { id_link: 16, type: "Facebook", tag: null, url: "https://duckduckgo.com/?t=ffab&q=xlsx+style&atb=v319-6__&ia=web", createdAt: "2022-04-27T23:49:20.544Z", updateAt: "2022-04-27T23:49:20.544Z" }
]

let header = ["ID", "TYPE", "TAG", "URL", "CREATE", "UPDATE"]
let data2 = data.map(i => {
    return [i.id_link, i.type, i.tag, i.url, i.createdAt, i.updateAt]
})
new Excel("Links", header, data2, [{
    column_name : "url",
    style : {
        width : 50
    }
}] )