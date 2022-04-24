import AWS from "aws-sdk";

class ClassBucketS3  {
    
    constructor(
        public readonly bucket = process.env.AWS_S3_BUCKET,
        public readonly AWS_S3 = new AWS.S3({ 
            apiVersion: "2006-03-01", 
            region: process.env.AWS_REGION
        })
    ){}


    async upload(){}
    async find(){}
    async delete(fileKey : string){}
}

export const BucketS3 = new ClassBucketS3()