import XLSX from 'xlsx-populate';
import { File } from '../File';
import { BucketS3 } from '../BucketS3';

export class Excel {

    private workBook;
    private sheetBook;
    public content_type:string =  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    public _default_style_header : Excel.Style = {
        width : 20,
        height: 20,
        text_color : "#000000",
        background_color : "e8650c"
    }
    
    constructor(
        public readonly SheetName : string,
        public readonly columnsName : Array<string>,
        public readonly ColumnsData : Array<Array<any>>,
        private readonly columnsCustomStyle ?: Array<Excel.CustomColumn>
    ){}

    public async build(path:string){
        this.workBook = await XLSX.fromBlankAsync()
        this.sheetBook = this.workBook.sheet(0).name(this.SheetName)

        this._buildHeader()
        this._populate()

        let filename : string;

        if (!path) filename = `planilha/${File.generateHashName()}.xlsx`
        else filename = path

        return await BucketS3.uploadFile(
            filename, 
            await this.workBook.outputAsync(), 
            this.content_type
        )
    }

    private _buildHeader()  {
        // APLICAR ESTILOS NAS CELULAS
        for (let i = 1; i <= this.columnsName.length; i++) {
            let column: string = Excel.alphabeticCode(i)
            let realIndex = i - 1

            if (!!this.columnsCustomStyle && !!this.columnsCustomStyle.length) {
                this.columnsCustomStyle.map((customStyle: Excel.CustomColumn) => {
                    if (
                        String(customStyle.column_name).toLowerCase() == this.columnsName[realIndex].toLocaleLowerCase()
                    ) this._setStyle({ column: column, row: 1 }, customStyle.style)
                    else this._setStyle({ column: column, row: 1 })
                })
            }else this._setStyle({ column: column, row: 1 })
        }

        // POPULAR AS CELULAS
        this.columnsName.forEach((column, index) => {
            this.sheetBook.cell(`${Excel.alphabeticCode(index + 1)}1`).value(column)
        })
    }


    private _populate(){
        let row = 2;
        
        for (const ColumnData of this.ColumnsData) {
            if (ColumnData.length != this.columnsName.length) throw { message : "Tamanhos invalidos"}
            this.columnsName.forEach((value:string, index:number) => {
                let cellValue = ColumnData[index]
                this.sheetBook.cell(`${Excel.alphabeticCode(index + 1)}${row}`).value(cellValue)
            })
            row++
        }
    }

    private _setStyle(
        location : { column : string, row : number }, 
        settings?: Excel.Style
    ){
        settings = this._cloneStyle(settings, this._default_style_header)
        let position = `${location.column}${location.row}`

        this.sheetBook.column(location.column).width(settings.width) // Tamanho da celula
        this.sheetBook.row(location.row).height(settings.height) // Altura da celula
        this.sheetBook.cell(position).style("fill", { // BackGround da celula
            type: "solid",
            color: settings.background_color
        });
    }

    private _cloneStyle(current : any, to : any){
        if (!!current){
            for (const props in to) {
                if (!current[props]){
                    current[props] = to[props]
                }
            }
        }else{
            current = to
        }
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