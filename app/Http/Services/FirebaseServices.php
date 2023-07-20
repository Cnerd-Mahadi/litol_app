<?php

namespace App\Http\Services;

use stdClass;

class FirebaseServices
{
    private static $database;
    private static $bucket;
    public function __construct()
    {
        $firestore = app('firebase.firestore');
        self::$database = $firestore->database();

        $firestorage = app('firebase.storage');
        self::$bucket = $firestorage->getBucket();
    }

    public function getCollection($collection)
    {
        return self::$database->collection($collection);
    }

    public function getData($documents)
    {
        $data = [];
        foreach ($documents as $document) {
            $data[] = [
                'id' => $document->id(),
                'data' => json_decode(json_encode($document->data()))
            ];
        }

        if (count($data) === 0) {
            return null;
        }

        return count($data) === 1 ? json_decode(json_encode($data[0])) : $data;
    }

    public function getDocument($documentId, $collection)
    {
        $collection = $this->getCollection($collection);
        $document = json_decode(json_encode($collection->document($documentId)->snapshot()->data()));

        $object = new stdClass();
        $object->id = $documentId;
        $object->data = $document;
        return $object;
    }

    public function getDocumentWithImage($documentId, $collection)
    {
        $collection = $this->getCollection($collection);
        $document = json_decode(json_encode($collection->document($documentId)->snapshot()->data()));
        $imageObject = $this->getObject($document->image, 'contents');

        $object = new stdClass();
        $object->id = $documentId;
        $object->data = $document;
        $object->imageUrl = $this->generateResourceAccessURL($imageObject);
        return $object;
    }

    public function getDocuments($documentsId, $collection)
    {
        $data = [];
        foreach ($documentsId as $documentId) {
            $data[] = $this->getDocument($documentId, $collection);
        }
        return $data;
    }

    public function saveFile($folder, $file, $fileName)
    {
        self::$bucket->upload($file, [
            'name' => $folder . '/' . $fileName,
        ]);

        return true;
    }

    public function getObject($objectName, $folder)
    {
        return self::$bucket->object($folder . '/' . $objectName);
    }

    public function generateResourceAccessURL($file)
    {
        return $file->signedUrl(
            new \DateTime('5 days'),
            [
                'version' => 'v4',
            ]
        );
    }

    public function getDataWithImage($documents)
    {
        $data = [];
        foreach ($documents as $document) {
            $imageObject = $this->getObject($document->data()['image'], 'contents');

            $data[] = [
                'id' => $document->id(),
                'data' => json_decode(json_encode($document->data())),
                'imageUrl' => $this->generateResourceAccessURL($imageObject)
            ];
        }
        if (count($data) === 0) {
            return null;
        }

        return count($data) === 1 ? json_decode(json_encode($data[0])) : $data;
    }
}