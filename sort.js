var rest = [

{
    name : 'whatever',
    rating : 3.5,
    price : 3.00,
    time : 45
},
{
    name : 'whatever',
    rating : 2.0,
    price : 4.00,
    time : 50
},
{
    name : 'whatever',
    rating : 1.5,
    price : 5.00,
    time : 30
},
{
    name : 'whatever',
    rating : 5.0,
    price : 6.00,
    time : 35
},
{
    name : 'whatever',
    rating : 4.5,
    price : 7.00,
    time : 55
}

]

var count = (Object.keys(gotMerch.merchants).length) + 1;

request(mechOpts, function(err, resp, merch){

                var gotMerch = JSON.parse(merch);
                for(var i=1;i<5;i++) {
                    console.log(gotMerch.merchants[i].id);
                }
                resf.send(gotMerch);
            });

            gotMerch.merchants[i].id

gotMerch.merchants[0].id

var rating = sortBy(rest, 'rating');

                for(var i = 0;i < gotMerch.length; i++) {
                    console.log(gotMerch.merchants[i]);
                }
