import AWS from "aws-sdk";
class ClassBucketS3  {
    
    constructor(
        public bucket: string = process.env.AWS_S3_BUCKET,
        public S3: AWS.S3 = new AWS.S3({
            apiVersion: "2006-03-01",
            signatureVersion: 'v4',
            region: process.env.AWS_REGION || "us-west-2",
            correctClockSkew: true,
            httpOptions: {
                connectTimeout: 360.000 // 6 minutos
            },
        })
    ){}


    async upload(){}
    async find(){}
    async delete(fileKey : string){}
}

export const BucketS3 = new ClassBucketS3()