<?php
require __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

use Sokil\Vast\Ad\InLine;

// create document
$factory = new \Sokil\Vast\Factory();
$document = $factory->create('2.0');
// or, if you have at least PHP5.4
$document = (new \Sokil\Vast\Factory())->create('2.0');
// creating through Document::create and other factory methods are now deprecated:
$document = \Sokil\Vast\Document::create('2.0');

// insert Ad section
$ad1 = $document
    ->createInLineAdSection()
    ->setId('preroll-1')
    ->setAdSystem('MyAD')
    ->setAdTitle('')
    ->addImpression('http://servedbyadbutler.com/callback.spark?ID=168640&bannerID=6763&publisherID=27614&campaignID=4064&setID=4015&advertiserID=81525&scheduleID=12155&placementID=12155&type=views');

$ad2 = $document
    ->createInLineAdSection()
    ->setId('preroll-2')
    ->setAdSystem('MyAD')
    ->setAdTitle('')
    ->addImpression('http://servedbyadbutler.com/callback.spark?ID=168640&bannerID=6763&publisherID=27614&campaignID=4064&setID=4015&advertiserID=81525&scheduleID=12155&placementID=12155&type=views');

// create creative for ad section
$ad1->createLinearCreative()
    ->setDuration(30)
    ->setVideoClicksClickThrough('http://entertainmentserver.com/landing')
    ->addVideoClicksClickTracking('http://ad.server.com/videoclicks/clicktracking')
    ->addVideoClicksCustomClick('http://ad.server.com/videoclicks/customclick')
    ->addTrackingEvent('start', 'http://ad.server.com/trackingevent/start')
    ->addTrackingEvent('pause', 'http://ad.server.com/trackingevent/stop')
    ->createMediaFile()
        ->setProgressiveDelivery()
        ->setType('video/mp4')
        ->setHeight(576)
        ->setWidth(1024)
        ->setBitrate(706)
        ->setProgressiveDelivery('progressive')
        ->setUrl('http://techslides.com/demos/sample-videos/small.mp4');
        //->setUrl('http://adbutler-fermion.com/libid422577/TVS-DiBELLA-GreatCoffee-30+-+converted+with+Clipchamp.mp4');

        // create creative for ad section
$ad2->createLinearCreative()
    ->setDuration(30)
    ->setVideoClicksClickThrough('http://entertainmentserver.com/landing')
    ->addVideoClicksClickTracking('http://ad.server.com/videoclicks/clicktracking')
    ->addVideoClicksCustomClick('http://ad.server.com/videoclicks/customclick')
    ->addTrackingEvent('start', 'http://ad.server.com/trackingevent/start')
    ->addTrackingEvent('pause', 'http://ad.server.com/trackingevent/stop')
    ->createMediaFile()
        ->setProgressiveDelivery()
        ->setType('video/mp4')
        ->setHeight(576)
        ->setWidth(1024)
        ->setBitrate(706)
        ->setProgressiveDelivery('progressive')
        ->setUrl('http://adbutler-fermion.com/libid422577/TVS-DiBELLA-GreatCoffee-30+-+converted+with+Clipchamp.mp4');

// get dom document
$domDocument = $document->toDomDocument();

// get XML string
echo $document;

?>   