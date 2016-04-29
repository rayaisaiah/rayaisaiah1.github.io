$(function () {
    var APPLICATION_ID = "5A3D518C-6D59-7004-FFF8-FEEF569EFA00",
        SECRET_KEY = "CBBB16A5-4191-DA38-FF41-1C82618C4F00",
        VERSION = "v1";
        
        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
         
        var postsCollection = Backendless.Persistence.of(Posts).find();
        
        console.log(postsCollection);
        
        var wrapper = {
            posts: postsCollection.data
        };
        
        Handlebars.registerHelper('format', function (time) {
            return moment(time).format("dddd, MMMM Do YYYY");
        });
        
        var blogScript = $("#blogs-template").html();
        var blogTemplate = Handlebars.compile(blogScript);
        var blogHTML = blogTemplate(wrapper);
        
        $('.main-container').html(blogHTML);
        
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}
$(document).on('click', '.deleteA',function (event){
   Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
   Materialize.toast('Deleted!', 10000)
   
   
});

$(document).on('click', '.check',function (event){
   
   Materialize.toast('Task Complete!', 10000)
});


