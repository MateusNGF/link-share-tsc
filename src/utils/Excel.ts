import XLSX from "xlsx";
import { BucketS3 } from "./BucketS3";

export class Excel {

    private workBook : XLSX.WorkBook = XLSX.utils.book_new()
    private workSheetData : Array<any>;
    private workSheet : XLSX.WorkSheet;
    private documentGenerated : any

    constructor(
        public SheetName : string,
        public CollumnsNames : Array<string>,
        public CollumnsData : Array<Array<any>>
    ){

        this.workSheetData = [
            this.CollumnsNames,
            ... this.CollumnsData
        ];

        this.workSheet = XLSX.utils.aoa_to_sheet(this.workSheetData)
        XLSX.utils.book_append_sheet(this.workBook, this.workSheet, this.SheetName)
    }

    public async generate(
        configuration : XLSX.WritingOptions
    ){

        if (!configuration) throw new Error("Setting for generate document no defined")

        this.documentGenerated = XLSX.write(this.workBook, configuration)
        return !!this.documentGenerated
    }

    public async upload(key : string){
        if (!this.documentGenerated) return;

        return await BucketS3.uploadFile(key, this.documentGenerated,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    }


}