<?php

namespace App\Http\Services;


use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class CommonServices
{
    private $firebaseService;

    public function __construct()
    {
        $this->firebaseService = app()->make(FirebaseServices::class);
    }

    public function checkUniqueTitle($title, $collection, $userId)
    {
        $uniqueValue = $this->firebaseService->getCollection($collection)->where('title', '=', $title)
            ->where('authorId', '=', $userId)->documents();
        return sizeof($this->firebaseService->getData($uniqueValue)) > 0 ? false : true;
    }

    public function checkUniqueTitleUpdated($title, $id, $collection, $userId)
    {
        $uniqueValue = $this->firebaseService->getCollection($collection)->where('title', '=', $title)
            ->where('authorId', '=', $userId)
            ->documents();
        $isSameValue = $this->firebaseService->getData($uniqueValue);
        return sizeof($isSameValue) > 0 && $id != $isSameValue[0]->id ? false : true;
    }

    public function saveImageWithData($content, $request, $contentType, $collection)
    {
        $savedContent = $this->firebaseService->getCollection($collection)->add($content);
        $contentId = $savedContent->id();
        $optimizedImage = $this->getOptimizedImage($request);
        $fileName = $this->setImageName($request, $contentId, $contentType);
        $this->firebaseService->saveFile($collection, $optimizedImage, $fileName);
        $this->addImage($fileName, $contentId, $collection);
    }

    public function getOptimizedImage(Request $request)
    {
        return Image::make($request->file('image'))
            ->resize(600, 600, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode();
    }

    public function addImage($fileName, $documentId, $collection)
    {
        $this->firebaseService->getCollection($collection)->document($documentId)->update([
            ['path' => 'image', 'value' => $fileName]
        ]);
        return true;
    }

    public function setImageName(Request $request, $contentId, $contentType)
    {
        $imageName = "IMG_" . $contentType . "_ID_" . $contentId . "." . $request->file('image')->getClientOriginalExtension();
        return $imageName;
    }

    public function getSubjects()
    {
        $subjectSnap = $this->firebaseService->getCollection('subjects')->documents();
        return $this->firebaseService->getData($subjectSnap);
    }

    public function getContentsfromAuthor($authorId, $collection)
    {
        $contentsSnap = $this->firebaseService->getCollection($collection)->where('authorId', '==', $authorId)
            ->documents();
        return $this->firebaseService->getDataWithImage($contentsSnap, $collection);
    }
}