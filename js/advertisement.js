jQuery.adblock = false;
if(BLOG_ADSENSE == false) {
//$('#HTML11').remove();
}
    if(BLOG_ADSENSE == true) {
      var iTextAdsCount = 0;
      $('.is-item .post-body i').each(function (i,val) {
        var iText = $(this).text();
        $(this).attr('data-itextid',i);
        if(iText === '.' && iTextAdsCount < 2) {          
          //console.log('adsShortCode[iTextAdsCount]',adsShortCode[iTextAdsCount]);
          $(this).attr('data-shortcode',iTextAdsCount);
          var $adsShortCodeObj = $($.parseHTML(adsShortCode[iTextAdsCount]));
          //$($adsShortCodeObj).css({'margin-top':'10px'});
          if(postBodyWidth < 480) {
            $($adsShortCodeObj).attr('data-ad-format','auto');
          }
          $(this).after($adsShortCodeObj);
          iTextAdsCount = iTextAdsCount + 1;
        }
      });

      if($('#adscolumn-top').length && adsTopColumnTop !== '') {
        var $adsTopColObj = $($.parseHTML(adsTopColumnTop));
        $('#adscolumn-top').append($adsTopColObj);
      }
      if($('#adssidebar-right').length && adsRightSidebar !== '' ){
        var $adsRightObj = $($.parseHTML(adsRightSidebar));
        if(windowWidth > 768) {
          $('#adssidebar-right').append($adsRightObj);
        }
      }

      if($('#adssidebar-left').length && adsLeftSidebar !== '' && $('.column-left-inner').width() > 100){
        var $adsLeftObj = $($.parseHTML(adsLeftSidebar));
        if(documentWidth > 1260) {
          if(documentHeight > 600) {
            var marginTop = parseInt(windowHeight,10) / 2;
            console.log('marginTop',marginTop)
            $('.desktop #adssidebar-left').css({'margin-top': marginTop + 'px','margin-top':'40vh'});
          }
          $('#adssidebar-left').append($adsLeftObj);
        } else if($adsLeftObj.hasClass('adsbygoogle') && $(document).width() > 767 && $(document).width() < 1200) {          
          $('#sidebar-right-1').prepend('<div class="in-sidebar in-leftside" id="adssidebar-right"></div>');
          $('#adssidebar-right').append($adsLeftObj);
        }
        $('.mobile.pg-item #blog-pager').after($adsLeftObj);
      }
      if($('#adspost-top').length && adsPBodyTop !== '') {
        var parsedHtml = $(adsPBodyTop);
        var $adsPostTopObj = $($.parseHTML(adsPBodyTop));
        if(postBodyWidth < 728 && postBodyWidth > 468) {
          $($adsPostTopObj).css({'height':'60px','width':'468px'});
        } else if(postBodyWidth < 468) {
          $($adsPostTopObj).css({'height':'50px','width':'320px'});
        } else {
          $($adsPostTopObj).css({'height':'90px','width':'728px'});
        }         
        $('#adspost-top').append($adsPostTopObj);
      }

      if($('#adspost-bottom').length && adsPBodyBottom !== '') {
        var $adsPostBottomObj = $($.parseHTML(adsPBodyBottom));
        if(postBodyWidth < 728 && postBodyWidth > 468) {
          $($adsPostBottomObj).attr('data-ad-format','auto').css({'display':'block','height':'250px'});
        } else if(postBodyWidth < 468) {
          //console.log('postBodyWidth < 468 adsPostTopObj')
          $($adsPostBottomObj).css({'height':'100px','width':'320px'});
        }
        $('#adspost-bottom').append($adsPostBottomObj);          
      }
      if($('#postcommenttop').length && adsCommentTop !== '') {
        var $adsCommentTopObj = $($.parseHTML(adsCommentTop));
        var $adsCommentTopObj2 = $($.parseHTML(adsCommentTop));
        $('.pg-item .post-comment').prepend($adsCommentTopObj);
        if($('.pg-index').length) {
          $('.pg-index #pindex-2').prepend($adsCommentTopObj);
          $('.pg-index #pindex-6').prepend($adsCommentTopObj2);
        }
      }

    $(document).ready(function(){
      var insAdsNum = $('ins.adsbygoogle').length;
      var postBodySize = $('.pg-item .post-body, .pg-static_page .post-body').attr('data-size');
      console.log('insAdsNum = ', insAdsNum);
      var limitAdsNum = insAdsNum;
      if(typeof postBodySize == undefined) {
        console.log('postBodySize == undefined');
        limitAdsNum = insAdsNum;
      } else if ( insAdsNum < limitAdsNum) {
        console.log('insAdsNum < limitAdsNum');
        limitAdsNum = insAdsNum;
      }else {
        console.log('postBodySize',postBodySize);          
        if(postBodySize < 1000) {limitAdsNum = limitAdsNum - 1;}
        if(postBodySize < 400) {limitAdsNum = limitAdsNum - 2;} 
      }

      //console.log('limitAdsNum = ', limitAdsNum);
      $('ins.adsbygoogle').each(function(i,val) {
        i = i+1;
        $(this).attr('data-adid', 'insads-'+i);
        //console.log('i = ' + i + ' / ' + insAdsNum);
        //$(this).addClass('adsbygoogle');        
        if(i < limitAdsNum ) { 
          //console.log('data-adid insads-'+i);
          $(this).after('<script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>');
        } else {
          //console.log('limit reach at i = ' + i + ' / ' + insAdsNum);
          //$(this).remove().hide();
        }
        //head.load('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
      });
    });

    } /* BLOG_ADSENSE = true */
