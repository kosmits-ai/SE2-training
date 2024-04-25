const test = require("ava");
const http = require("http");
const {app} = require("./index.js");
const listen = require("test-listen");

const got = require("got");

const {
    booksBookIdBorrowPOST,
    booksBookIdDELETE,
    booksBookIdGET,
    booksBookIdReturnPOST,
    booksGET,
    booksPOST ,
    usersGET,
    usersPOST,
    usersUserIdBorrowingsGET,
    usersUserIdDELETE,
    usersUserIdGET,
    usersUserIdPUT
} = require('./service/DefaultService.js');


test.before(async (t) =>{
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    t.context.got =got.extend({prefixUrl: t.context.prefixUrl, responseType: "json"});
});


test("Unit testing of booksGET",async (t) =>{
    const result =await booksGET();
    t.is(result.length,2);
    t.is(result[0].author, 'author');
});

/*
test("Successfully getting a book", async (t) =>{
    const {body, statusCode} = await t.context.got("books");
    t.is(statusCode, 200);
});
*/

test("Unit testing of userGET", async (t) => {
    const result = await usersGET();
    t.is(result.length, 2);
    t.is(result[0].name, 'name');
});
/*
test("Successfully get the user details", async (t) => {
    const userid = 123;
    const url = `users/${userid}`;
    const {body,statuscode} = await t.context.got(url);
    t.is(statuscode, 200);
    t.is(body.name, 'name');
}); */

test('Async', async t => {
    const res = Promise.resolve('test');
    t.is(await res, 'test');
});

test("Unit testing of borrow books for a user", async (t) =>{
    const result = await usersUserIdBorrowingsGET();
    t.is(result.length, 2);
    t.is(result[0].userId, 0);
});

test("Unit testing of booksPOST", async (t) =>{
    const postData ={
        id: 3,
        author: 'author'
    };
    const result = await booksPOST(postData);
    t.pass();
    
});

/*
test("Successfully posting a book", async (t) => {
    const postData = {
        id: 3,
        author: 'author'
    };

    const result = await t.context.got.post("books", {json: postData});
    t.is(result.statusCode, 201);
});

*/
test.after.always((t) =>{
    t.context.server.close();
});
