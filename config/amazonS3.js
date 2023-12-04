require('dotenv').config();
const { S3Client,DeleteObjectCommand  } = require('@aws-sdk/client-s3')

const S3 = new S3Client({
    s3ForcePathStyle: true,
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AMAZON_ACCESS_KEY,
      secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
});

async function deleteObjectFromS3(key) {
  const params = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
  };

const deleteCommand = new DeleteObjectCommand(params);

try{
    const result = await S3.send(deleteCommand);
    // console.log('Image deleted from S3', result);
} catch (err) {
    console.error('Error deleting image from S3:', err);

  }
}

// console.log("s3, ", s3)
module.exports = {S3,deleteObjectFromS3};