import AWS from "aws-sdk";
import fs from "fs";

export async function uploadFile(fileLocalPath: string, remotePath: string, remoteName: string, mimeType: string) {
	const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: process.env.AWS_REGION });
	const fileContent = fs.readFileSync(fileLocalPath);
	const params = {
		Bucket: process.env.AWS_S3_BUCKET,
		Key: remotePath + "/" + remoteName,
		Body: fileContent,
		ContentType: mimeType,
	};
	const data = await s3.upload(params).promise();
	return data.Location;
}

export async function findFile(remoteFile: string) {
	const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: process.env.AWS_REGION });
	const params = {
		Bucket: process.env.AWS_S3_BUCKET,
		Prefix: remoteFile,
	};
	const result = await s3.listObjectsV2(params).promise();
	return result.Contents.map((item) => item.Key);
}

export async function deleteFile(remoteFile: string) {
	const s3 = new AWS.S3({ apiVersion: "2006-03-01", region: process.env.AWS_REGION });
	const params = {
		Bucket: process.env.AWS_S3_BUCKET,
		Key: remoteFile,
	};
	return await s3.deleteObject(params).promise();
}
