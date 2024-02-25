<?php

namespace App\Http\Services;

use stdClass;

class FirebaseServices
{
    private static $database;
    private static $bucket;
    private static $auth;
    public function __construct()
    {
        $firestore = app('firebase.firestore');
        self::$database = $firestore->database();

        $firestorage = app('firebase.storage');
        self::$bucket = $firestorage->getBucket();

        self::$auth = app('firebase.auth');
    }

    public function getAuth()
    {
        return self::$auth;
    }

    public function getCollection($collection)
    {
        return self::$database->collection($collection);
    }

    public function getData($documents)
    {
        $data = [];
        foreach ($documents as $document) {
            $data[] = json_decode(json_encode([
                'id' => $document->id(),
                'data' => $document->data()
            ]));
        }

        return $data;
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
        $collectionName = $collection;
        $collection = $this->getCollection($collection);
        $document = json_decode(json_encode($collection->document($documentId)->snapshot()->data()));
        $imageObject = $this->getObject($document->image, $collectionName);

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

    public function snapToObject($data)
    {
        $object = json_decode(json_encode($data));
        return $object;
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

    public function getDataWithImage($documents, $collection)
    {
        $data = [];
        foreach ($documents as $document) {
            $imageObject = $this->getObject($document->data()['image'], $collection);

            $data[] = [
                'id' => $document->id(),
                'data' => json_decode(json_encode($document->data())),
                'imageUrl' => $this->generateResourceAccessURL($imageObject)
            ];
        }
        return $data;
    }
}