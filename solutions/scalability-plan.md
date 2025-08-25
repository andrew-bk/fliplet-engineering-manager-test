# Scalability Plan for Image Processing
## Challenge
Handling 10M+ images per day.

## Assumptions

- images will need to be resized / reformatted for different screen sizes give some of our users will be on mobile
- we assume that images will be processed into 3 sizes: small, medium and large

## Solution

The iamge progcessing system will be comprised of these components:

- REST API deployed in ECS (10mil images per day means this api is likely to be fully utilised for most fo the day and ECS would work out cheaper than Lambda for this)
- S3 buckets for image storage
- an image record database in RDS
- SQS queues for orchestrating image processing
- Lambda functions for triggering image processing

#### REST API

There will be a REST API with two endpoints: '/upload' and '/get_image'.

#### `/upload` endpoint

This endpoint is used for uploading new images to the image processing system. When a request is made, this endpoint will respond with a presigned S3 URL for the client to use to upload the raw image. The raw image will be stored in an S3 bucket called 's3://raw-image-<env>' where env is either 'prod' or 'test'.

A record will be added to the image record database with a unique id for the image and the S3 path for the raw image. The client will upload the image to S3 using the presigned url.


#### Image processing

The raw image bucket will be configured so that a notification is sent to the StartProcessingLambda function when an object is created in the bucket. So when a raw image is uploaded, the StartProcessingLambda is triggered.

There will be 3 SQS queues: process-large-image, process-medium-image and process-small. StartProcessingLambda will put a message on each queue which contains the path to the new raw image and it's id.  The queues will be configured to have a ProcessImageLambda function listening to each queue. When triggered, this lambda will process the raw image and resize it. The resized image wil be uploaded to 's3://processed-image-<env>/<image_id>/<image_size>'.

Trying to process all resizes in one lambda call would mean we might go over the total execution time for the lambda. Just doing one resize mitigates this and keeps the lambda code simpler.

If an error occurs during processing, the lambda would exit with an error and SQS would re-enqueue the message. A dead letter queue could be configured for images that completely fail to be processed after a few tries.

The queues allow for resilience against spikes in uploads.


#### `/get_image` endpoint

The get_image endpoint will be used by clients for downloading an image. 

| Query Parameter | Information |
| --- | --- |
| image_id | the id of the image to get |
| image_size | small,medium,large: the size of the image required |


The image_size parameter would allow mobile clients to request smaller image sizes.

The endpoint would look up the required image size in 's3://processed-image/<image_id>/<image_size>'. If the image is not available in the 'processed-image' bucket then try the next size image from smallest to largest. If none of the processed images are available, we could degrade to returning the raw image instead.  The idea is that if for some reason we don't have the requested size of the image we can degrade to a size that we do have.

The image may not be in the processed-image bucket because:

- the system has not finished being processed, perhaps the client was very quick in requesting the image after the upload
- an error occured during the image processing / resize


### Cost measures


- Reserved instance pricing could reduce the cost of the REST API in ECS
- Using lambda for the processing would be more cost efficient that ECS since they the requests would be more intermittent
- SQS is very cost efficient, costing cents per million messages
- S3 storage ccosts can be mitigated by using automatic lifecycle transitions for older images, choosing to remove raw images once processed (if we don't need to keep them)
