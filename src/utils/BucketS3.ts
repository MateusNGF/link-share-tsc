import AWS from "aws-sdk";

export interface IFilesCloudManager {
    uploadFile(...params: Array<String>): Promise<any>
    deleteFile(...params: Array<any>): Promise<any>
}

class ClassBucketS3 implements IFilesCloudManager  {
    
    constructor(
        public bucket: string = process.env.AWS_S3_BUCKET,
        public S3: AWS.S3 = new AWS.S3({
            apiVersion: "2006-03-01",
            signatureVersion: 'v4',
            credentials:{
                accessKeyId : process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_REGION || "us-west-2",
            correctClockSkew: true,
            httpOptions: {
                connectTimeout: 360.000 // 6 minutos
            },
        })
    ){}

    async uploadFile(key : string, content : any, contentType : string){
        return this.S3.upload({
            Bucket: process.env.AWS_S3_BUCKET,
            Key : key,
            Body: content,
            ContentType: contentType,
            ContentEncoding: 'base64'
        }).promise();
    }

     async deleteFile(filename: string) {
        return this.S3.deleteObject({
            Bucket: this.bucket,
            Key : filename,
        }).promise();
    }
}

export const BucketS3 = new ClassBucketS3()