if (typeof(msg) !== 'undefined'){
  alert(msg);
}

$(function(){
  $('#createButton').click(function() {
    if(($('#inputADT').val() === '') || ($('#inputPort').val() === '')){
      if($('#inputADT').val() === ''){
        $('#inputADT').css({
                            "box-shadow:" : "0 0 5px rgba(81, 203, 238, 1)",
                            "border" : "2px solid rgba(81, 203, 238, 1)"});
        $('#inputADT').focus(function(){
          $('#inputADT').css({
                              "box-shadow:" : "",
                              "border" : ""});
        });
      }
      if($('#inputPort').val() === ''){
        $('#inputPort').css({
                            "box-shadow:" : "0 0 5px rgba(81, 203, 238, 1)",
                            "border" : "2px solid rgba(81, 203, 238, 1)"});
        $('#inputPort').focus(function(){
          $('#inputPort').css({
                              "box-shadow:" : "",
                              "border" : ""});
        });
      }
    }else{
      var postData = {adt : $('#inputADT').val(), port : $('#inputPort').val(), ip : $('#inputIp').val()};
      $.ajax({
        url:'/tcp/createTcpServer',
        type:'post',
        timeout:5000,
        dataType:'json',
        data:postData,
        error:function(result){
          console.log(result);
          alert(result.responseJSON.resMsg);
        },
        success: function(result){
          console.log(result);
          alert(result.resMsg);
        }
     });
   }
  });
});
