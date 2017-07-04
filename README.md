# jquery.youtube-cover-photo

Youtube provides different resolution thumbnails for videos. Not all thumnail resolutions are available for all videos. The plugin was designed to display the highest available resolution for the specific video.
Video ID must be specified as a data-youtube-id attribute for the target tag.

## Example
$('img[data-youtube-id]').youtubeCoverPhoto({ /* options and callbacks */ });

## Options
The following options can be supplied as arguments

### background
Boolean value.
When set to **true** the thumbnail image will be set as a background-image property of a target tag. When set to false (default behaviour), image will be set as an **src** attribute of a tag.
Default value is **false**.

### useMaxRes
Boolean value.
Youtube provides "maximum resolution" image for high quality videos. MaxRez image is usually a very large one and might not be required in some cases. By setting the property to **false** the plugin will skip MaxRez thumbnail and will try to retrieve lower quality thumbnails.
Default value is **true**.
