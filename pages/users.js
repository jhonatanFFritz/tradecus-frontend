import { BlobServiceClient } from "@azure/storage-blob";
import { useEffect, useState } from "react";

const connectionString = 'AccountName=tradecus2023;AccountKey=EC1+HW9Z3FmEjuqKJfq8aLG3SdX8qYn1ag3jXlsZWzMNPd4LuDosGAzwdM15Dx1/gML3q0RL4R3o+AStLG9I9Q==;EndpointSuffix=core.windows.net';

const containerName = 'tradecusimg';

async function fetchBlobUrls() {
  console.log(connectionString, containerName)
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobs = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlobClient(blob.name);
    const blobUrl = blobClient.url;
    blobs.push(blobUrl);
  }

  return blobs;
}

export default function ImageGallery() {
  const [blobUrls, setBlobUrls] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const urls = await fetchBlobUrls();
      setBlobUrls(urls);
    }

    fetchData();
  }, []);

  return (
    <div>
      {blobUrls.map((url) => (
        <img key={url} src={url} alt="Imagen desde Azure Blob Storage" />
      ))}
    </div>
  );
}
