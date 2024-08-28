import AWS from "aws-sdk";

// Initialize AWS S3 with credentials and configuration
AWS.config.update({
  accessKeyId: "AKIAXGZAMPYD2TRSOFO6",
  secretAccessKey: "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",
  region: "eu-north-1",
});

const s3 = new AWS.S3();

// Function to upload image to S3
export const uploadImageToS3 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a unique file name
    const fileName = `${Date.now()}-${file.name}`;

    // S3 upload parameters
    const params = {
      Bucket: "bistrotable",
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: "public-read", // Makes the file publicly accessible
    };

    // Perform the S3 upload
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err); // Reject promise on error
      } else {
        resolve(data.Location); // Resolve promise with the URL of the uploaded image
      }
    });
  });
};
