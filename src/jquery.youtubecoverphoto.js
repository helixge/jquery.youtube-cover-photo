/**!
 * jquery.youtubeCoverPhoto v1.0.0
 * https://github.com/helixgroup/jquery.youtube-cover-photo
 * 
 * Copyright 2017 Helix Group
 * Released under the MIT License.
 * 
 * Date: July 4, 2017
 */

$.fn.youtubeCoverPhoto = function (options) {
    var youtubeCoverPhotoConstant = 'youtubeCoverPhoto';
    var _this = this;

    var ycp = {};
    ycp.options = options || {};
    ycp.options.background = ("background" in ycp.options) ? !!ycp.options.background : false;
    ycp.options.useMaxRes = ("useMaxRes" in ycp.options) ? !!ycp.options.useMaxRes : true;

    ycp.photoLevels = ['hqdefault', 'mqdefault', '0']
    if (ycp.options.useMaxRes) { ycp.photoLevels.unshift('maxresdefault'); }

    ycp.process = function () {
        _this.each(function () {
            ycp.processItem($(this));
        });
    }
    ycp.getSrcUrl = function (videoId, resolutionIndex) {
        var resolution = ycp.photoLevels[resolutionIndex];
        if (!resolution) { return null; }
        return '//img.youtube.com/vi/' + videoId + '/' + resolution + '.jpg';
    }
    ycp.getYoutubeId = function (item) {
        return $(item).data('youtube-id')
    }
    ycp.processItem = function ($item, resolutionIndex) {
        var youtubeId = ycp.getYoutubeId($item);
        if (!youtubeId || !youtubeId.length) { return; }

        if (resolutionIndex === undefined) { resolutionIndex = 0; }

        var srcUrl = ycp.getSrcUrl(youtubeId, resolutionIndex);

        var img = new Image();
        img.target = $item[0];
        $(img).on('load', null, {
            image: img,
            target: $item[0],
            resolutionIndex: resolutionIndex
        }, ycp.onloadHandler);
        img.src = srcUrl;
    }
    ycp.onloadHandler = function (e) {
        var img = e.data.image;
        var $target = $(e.data.target);
        var resolutionIndex = e.data.resolutionIndex;
        var youtubeId = ycp.getYoutubeId($target);
        
        $(img).off('load', ycp.onloadHandler);

        setTimeout(function () {
            if (!ycp.imageIsValid(img)) {
                resolutionIndex++;
                var srcUrl = ycp.getSrcUrl(youtubeId, resolutionIndex);
                if (!!srcUrl) {
                    ycp.processItem($target, resolutionIndex);
                }
                return;
            }

            ycp.assignLoadedImage($target, img.src);
        });
    }
    ycp.assignLoadedImage = function ($target, url) {
        if (ycp.options.background) {
            $target.style('background-image', url);
        }
        else {
            $target.attr('src', url);
        }

    }
    ycp.imageIsValid = function (img) {
        return img.width > 120
    }
    _this.on('update', function () {
        ycp.process();
    });

    ycp.process();
    return ycp;
};